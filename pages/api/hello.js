
export default function handler(req, res) {
  res.status(200).json([
    {
      producto: "Camiseta",
      precio: 19.99,
      id: "001"
    },
    {
      producto: "Pantalón",
      precio: 29.99,
      id: "002"
    },
    {
      producto: "Zapatos",
      precio: 49.99,
      id: "003"
    }
  ]);
}
