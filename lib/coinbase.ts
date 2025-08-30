import axios from "axios";

const API_URL = "https://api.commerce.coinbase.com/charges";
const API_KEY = process.env.COINBASE_API_KEY as string;

export async function createCharge(
  name: string,
  description: string,
  amount: number,
  currency = "USDC",
  metadata: any = {}
) {
  const res = await axios.post(API_URL, {
    name,
    description,
    pricing_type: "fixed_price",
    local_price: { amount, currency },
    metadata
  }, {
    headers: {
      "X-CC-Api-Key": API_KEY,
      "X-CC-Version": "2018-03-22",
      "Content-Type": "application/json",
    },
  });

  return res.data.data;
}
