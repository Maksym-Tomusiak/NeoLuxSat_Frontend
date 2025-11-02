import { useState, useEffect } from 'react';
import { PropositionService } from '@/services/proposition.service';
import type { PropositionDto } from '@/types/proposition';

export const usePropositionsLogic = () => {
  const [propositions, setPropositions] = useState<PropositionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPropositions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await PropositionService.getAllPropositions(
          controller.signal
        );
        setPropositions(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Failed to fetch propositions:', err);
          setError('Не вдалося завантажити пропозиції.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPropositions();

    return () => controller.abort();
  }, []);

  return { propositions, loading, error };
};
