import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const WEBHOOK_SECRET = process.env.COINBASE_WEBHOOK_SECRET as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const signature = req.headers["x-cc-webhook-signature"] as string;
  const rawBody = JSON.stringify(req.body);

  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  hmac.update(rawBody, "utf8");
  const expected = hmac.digest("hex");

  if (signature !== expected) return res.status(400).end("Invalid signature");

  const event = req.body.event;

  if (event.type === "charge:confirmed") {
    const { type, id } = event.data.metadata;

    if (type === "ico") await prisma.ico.update({ where: { id: Number(id) }, data: { status: "approved" } });
    else if (type === "banner") await prisma.banner.update({ where: { id: Number(id) }, data: { status: "approved" } });
  }

  res.status(200).json({ received: true });
}
