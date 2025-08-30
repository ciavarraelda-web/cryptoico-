import { NextApiRequest, NextApiResponse } from "next";
import { createCharge } from "../../../lib/coinbase";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { type, data } = req.body;

  try {
    let charge;

    if (type === "ico") {
      const ico = await prisma.ico.create({
        data: { name: data.name, description: data.description, website: data.website, logoUrl: data.logoUrl || null }
      });

      charge = await createCharge(`ICO - ${data.name}`, "Listing ICO on CryptoICO.eu", 100, "USDC", { type, id: ico.id });
      await prisma.ico.update({ where: { id: ico.id }, data: { chargeId: charge.id } });

    } else if (type === "banner") {
      const banner = await prisma.banner.create({
        data: { imageUrl: data.imageUrl, duration: data.duration }
      });

      const amount = data.duration === 7 ? 150 : 100;

      charge = await createCharge(`Banner Promotion`, `Banner ${data.duration} days on CryptoICO.eu`, amount, "USDC", { type, id: banner.id });
      await prisma.banner.update({ where: { id: banner.id }, data: { chargeId: charge.id } });
    }

    res.status(200).json({ url: charge.hosted_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating payment" });
  }
}
