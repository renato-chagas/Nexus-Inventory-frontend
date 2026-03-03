"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { assetHistoryService } from "@/services/models/asset_history.service";
import { Input } from "@/components/ui";
import { AssetHistory } from "@/types";

const ACTION_LABELS: Record<string, string> = {
  CHECKOUT: "Entregue ao funcionário",
  CHECKIN: "Retornado ao inventário",
  MAINTENANCE: "Enviado para manutenção",
  DISPOSAL: "Descartado",
};

const ACTION_COLORS: Record<string, string> = {
  CHECKOUT: "bg-blue-100 text-blue-700",
  CHECKIN: "bg-green-100 text-green-700",
  MAINTENANCE: "bg-yellow-100 text-yellow-700",
  DISPOSAL: "bg-red-100 text-red-700",
};

interface HistoryResponse extends AssetHistory {
  asset_name?: string;
  employee_name?: string;
}

export default function Historico() {
  const { accessToken } = useAuth();
  const [history, setHistory] = useState<HistoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [filterAsset, setFilterAsset] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const loadHistory = async () => {
    try {
      setLoading(true);

      // Carrega o histórico diretamente da API
      const historyResponse = await assetHistoryService.getAll(
        accessToken || undefined,
      );

      let allHistory: HistoryResponse[] = Array.isArray(historyResponse)
        ? historyResponse
        : historyResponse?.results || [];

      console.log("Histórico carregado:", allHistory);
      console.log("Total de históricos:", allHistory.length);

      // Ordenar por data decrescente
      allHistory.sort((a, b) => {
        const dateA = new Date(a.action_date).getTime();
        const dateB = new Date(b.action_date).getTime();
        return dateB - dateA;
      });

      setHistory(allHistory);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string) => {
    try {
      const d = new Date(date);
      return d.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return String(date);
    }
  };

  const formatDateForInput = (dateString: string | Date) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchDate =
      !filterDate ||
      formatDateForInput(item.action_date).startsWith(filterDate);
    const matchAsset =
      !filterAsset ||
      (item.asset_name?.toLowerCase() || "").includes(
        filterAsset.toLowerCase(),
      );
    const matchEmployee =
      !filterEmployee ||
      (item.employee_name?.toLowerCase() || "").includes(
        filterEmployee.toLowerCase(),
      );
    return matchDate && matchAsset && matchEmployee;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando histórico...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Histórico de Ativos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          label="Filtrar por Data"
          type="date"
          value={filterDate}
          onChange={(value) => setFilterDate(value)}
        />
        <Input
          label="Filtrar por Ativo"
          placeholder="Nome do ativo..."
          value={filterAsset}
          onChange={(value) => setFilterAsset(value)}
        />
        <Input
          label="Filtrar por Responsável"
          placeholder="Nome do funcionário..."
          value={filterEmployee}
          onChange={(value) => setFilterEmployee(value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-auto max-h-150">
          <table className="w-full border-collapse">
            <thead>
              <tr className="sticky top-0 bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Ativo
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Tipo de Ação
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Funcionário Responsável
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Observações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {filterDate || filterAsset || filterEmployee
                      ? "Nenhum resultado encontrado com os filtros aplicados"
                      : "Nenhum histórico encontrado"}
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {item.asset_name || `Ativo #${item.asset}`}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {formatDate(item.action_date)}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${ACTION_COLORS[item.action_type]}`}
                      >
                        {ACTION_LABELS[item.action_type]}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {item.employee_name || `Funcionário #${item.employee}`}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {item.observaitions || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
