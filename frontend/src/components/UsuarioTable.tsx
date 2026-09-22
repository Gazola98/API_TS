import type { Usuario } from "../types/Usuario";

interface UsuarioTableProps {
  usuarios: Usuario[];
  deletandoId: number | null;
  deletarUsuario: (id: number) => void;
  editarUsuario: (usuario: Usuario) => void;
}

function UsuarioTable({
  usuarios,
  deletandoId,
  deletarUsuario,
  editarUsuario,
}: UsuarioTableProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Usuário</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Profissão</th>
              <th className="px-6 py-4">Cidade</th>
              <th className="px-6 py-4">País</th>
              <th className="px-6 py-4">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {usuarios.map((usuario) => (
              <tr
                key={usuario.id}
                className="transition hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {usuario.id}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  {usuario.usuario}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  {usuario.email}
                </td>

                <td className="px-6 py-4">
                  {usuario.profissao}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  {usuario.cidade}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  {usuario.pais}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => editarUsuario(usuario)}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                    >
                      Editar
                    </button>

                    <button
                      disabled={deletandoId === usuario.id}
                      onClick={() => {
                        const confirmar = window.confirm(
                          `Deseja realmente excluir o usuário ${usuario.usuario}?`,
                        );

                        if (confirmar) {
                          deletarUsuario(usuario.id);
                        }
                      }}
                      className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletandoId === usuario.id
                        ? "Excluindo..."
                        : "Excluir"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsuarioTable;