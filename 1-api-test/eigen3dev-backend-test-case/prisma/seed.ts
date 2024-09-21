import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.member.upsert({
    where: { code: 'M001' },
    update: {},
    create: {
      code: 'M001',
      name: 'Angga',
    },
  });

  await prisma.member.upsert({
    where: { code: 'M002' },
    update: {},
    create: {
      code: 'M002',
      name: 'Ferry',
    },
  });

  await prisma.member.upsert({
    where: { code: 'M003' },
    update: {},
    create: {
      code: 'M003',
      name: 'Putri',
    },
  });

  await prisma.book.upsert({
    where: { code: 'JK-45' },
    update: {},
    create: {
      code: 'JK-45',
      title: 'Harry Potter',
      author: 'J.K Rowling',
      stock: 1,
    },
  });

  await prisma.book.upsert({
    where: { code: 'SHR-1' },
    update: {},
    create: {
      code: 'SHR-1',
      title: 'A Study in Scarlet',
      author: 'Arthur Conan Doyle',
      stock: 1,
    },
  });

  await prisma.book.upsert({
    where: { code: 'TW-11' },
    update: {},
    create: {
      code: 'TW-11',
      title: 'Twilight',
      author: 'Stephenie Meyer',
      stock: 1,
    },
  });

  await prisma.book.upsert({
    where: { code: 'HOB-83' },
    update: {},
    create: {
      code: 'HOB-83',
      title: 'The Hobbit, or There and Back Again',
      author: 'J.R.R. Tolkien',
      stock: 1,
    },
  });

  await prisma.book.upsert({
    where: { code: 'NRN-7' },
    update: {},
    create: {
      code: 'NRN-7',
      title: 'The Lion, the Witch and the Wardrobe',
      author: 'C.S. Lewis',
      stock: 1,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
