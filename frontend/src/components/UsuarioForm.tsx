import type { FormEvent } from "react";

interface UsuarioFormProps {
  usuario: string;
  email: string;
  profissao: string;
  cidade: string;
  pais: string;

  setUsuario: (valor: string) => void;
  setEmail: (valor: string) => void;
  setProfissao: (valor: string) => void;
  setCidade: (valor: string) => void;
  setPais: (valor: string) => void;

  editandoId: number | null;
  cadastrarUsuario: (event: FormEvent) => void;
  cancelarEdicao: () => void;
}

function UsuarioForm({
  usuario,
  email,
  profissao,
  cidade,
  pais,
  setUsuario,
  setEmail,
  setProfissao,
  setCidade,
  setPais,
  editandoId,
  cadastrarUsuario,
  cancelarEdicao,
}: UsuarioFormProps) {
  return (
    <form
      onSubmit={cadastrarUsuario}
      className="mb-8 rounded-xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-xl font-semibold text-gray-800">
        {editandoId === null ? "Cadastrar usuário" : "Editar usuário"}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Usuário
          </label>

          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Profissão
          </label>

          <input
            type="text"
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Cidade
          </label>

          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            País
          </label>

          <input
            type="text"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          {editandoId === null ? "Cadastrar" : "Salvar alterações"}
        </button>

        <button
          type="button"
          onClick={cancelarEdicao}
          className="rounded-lg bg-gray-200 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-300"
        >
          Cancelar
        </button>
      </div>
      
    </form>
  );
}

export default UsuarioForm;
