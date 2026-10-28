const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Memulai proses seeding data master (CategoryJob & Industry)...");

	const categories = [
		"Software Engineering",
		"UI/UX Design",
		"Product Management",
		"Marketing & Sales",
		"Data Science & Analytics",
		"Human Resource",
		"Finance & Accounting",
		"Customer Support",
	];

	const industries = [
		"Technology & Software",
		"Finance & Banking",
		"E-Commerce & Retail",
		"Healthcare & Medical",
		"Education & EdTech",
		"Media & Entertainment",
		"Logistics & Supply Chain",
	];

	for (const name of categories) {
		const exists = await prisma.categoryJob.findFirst({ where: { name } });
		if (!exists) {
			await prisma.categoryJob.create({ data: { name } });
		}
	}
	console.log(`✅ Berhasil memastikan ${categories.length} Kategori Pekerjaan (CategoryJob).`);

	for (const name of industries) {
		const exists = await prisma.industry.findFirst({ where: { name } });
		if (!exists) {
			await prisma.industry.create({ data: { name } });
		}
	}
	console.log(`✅ Berhasil memastikan ${industries.length} Industri Perusahaan (Industry).`);

	console.log("🎉 Seeding selesai!");
}

main()
	.catch((e) => {
		console.error("❌ Gagal melakukan seeding:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

