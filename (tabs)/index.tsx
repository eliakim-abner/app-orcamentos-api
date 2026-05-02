import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Orcamento = {
  nome: string;
  telefone: string;
  grauOd?: string;
  grauOe?: string;
  visto: boolean;
  enviado: boolean;

};

export default function App() {
  const [dados, setDados] = useState<Orcamento[]>([]);

  const getStatus = (item: Orcamento) => {
    if (item.enviado) return "🟢 Enviado";
    if (item.visto) return "🔵 Visto";
    return "🟡 Novo";
};

  const carregarDados = () => {
    fetch("https://pucker-quill-related.ngrok-free.dev/orcamentos")
      .then((res) => res.json())
      .then((data) => {
        const filtrados = data.filter(
          (item: Orcamento) => item.nome && item.telefone,
        );
        setDados(filtrados);
      })
      .catch((err) => console.log(err));
  };

  
  const deletar = (id: number) => {
  fetch(`https://pucker-quill-related.ngrok-free.dev/orcamentos/${id}`, {
    method: "DELETE"
  }).then(() => carregarDados());
};

const marcarVisto = (id: number) => {
  fetch(`https://pucker-quill-related.ngrok-free.dev/orcamentos/${id}/visto`, {
    method: "PATCH"
  }).then(() => carregarDados());
};

const marcarEnviado = (id: number) => {
  fetch(`https://pucker-quill-related.ngrok-free.dev/orcamentos/${id}/enviado`, {
    method: "PATCH"
  }).then(() => carregarDados());
};

  
  useEffect(() => {
      carregarDados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>          Ana Ótica Orçamentos</Text>
      
      

      {/* LISTA */}
      <FlatList
        data={dados}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}

        renderItem={({ item }) => (
  <View style={styles.card}>
    
    <Text style={styles.nome}>{item.nome}</Text>
    <Text>{item.telefone}</Text>
    <Text>OD: {item.grauOd}</Text>
    <Text>OE: {item.grauOe}</Text>

    <Text style={{ marginTop: 5 }}>
      {getStatus(item)}
    </Text>

    <View style={styles.botoes}>
      <TouchableOpacity onPress={() => marcarVisto(item.id!)} style={styles.botaoAcao}>
        <Text>👁 Visto</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => marcarEnviado(item.id!)} style={styles.botaoAcao}>
        <Text>📤 Enviado</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deletar(item.id!)} style={styles.botaoDelete}>
        <Text style={{ color: "#fff" }}>🗑 Excluir</Text>
      </TouchableOpacity>
    </View>

  </View>
)}
      />

      <TouchableOpacity
        onPress={carregarDados}
        activeOpacity={0.6}
        style={styles.botao}
      >
        <Text style={styles.botaoTexto}>Atualizar</Text>
      </TouchableOpacity>

      
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 25,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Android
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  telefone: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  grau: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
},

  status: {
    marginTop: 8,
    fontSize: 13,
    color: "#333",
},
  grauOd: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  grauOe: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  botao: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botoes: {
   flexDirection: "row",
   justifyContent: "space-between",
   marginTop: 10
},

  botaoAcao: {
   backgroundColor: "#ddd",
   padding: 8,
   borderRadius: 5
},

  botaoDelete: {
   backgroundColor: "#e74c3c",
   padding: 8,
   borderRadius: 5
}

});
