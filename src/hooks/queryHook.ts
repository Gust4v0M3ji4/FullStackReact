import DataRepo from '@/api/datasource'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCandidateById = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteCandidate'],
    mutationFn: (id: string) => DataRepo.deleteCandidate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] })
      alert('Candidato Eliminado Exitosamente !!')
    },
    onError: (error) => {
      alert(`Hubo un error al eliminar el candidato: ${error}`)
    },
  })
}
