import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import {
  Permissions,
  PrismaClient,
  Roles,
  Status,
  Theme,
  Language,
} from '@prisma/client';

const randomUsersCount = 100;
const prisma = new PrismaClient();

function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function main(): Promise<void> {
  await prisma.user.deleteMany();

  console.log('Seeding...');

  generateAdmin()
    .then(() => generateEmployees())
    .then(() => generateDepartments())
    .then(() => generatePositions())
    .then(() => generatePayGrades())
    .catch((error) => console.log(error.message));
}

async function generateAdmin() {
  await prisma.user.upsert({
    where: { email: 'admin@zenith.com' },
    update: {},
    create: {
      email: 'admin@zenith.com',
      password: await hashPassword('P0klik4$'),
      status: Status.ACTIVE,
      role: Roles.ADMIN,
      permissions: [
        Permissions.USER_CREATE,
        Permissions.USER_READ,
        Permissions.USER_READ_SELF,
        Permissions.USER_DELETE,
        Permissions.USER_EDIT,
      ],
      personalInfo: {
        create: {
          firstName: 'Admin',
          lastName: 'Nimda',
          phone: faker.phone.number(),
        },
      },
      address: {
        create: {
          country: faker.location.country(),
          city: faker.location.city(),
          street: faker.location.street(),
          buildingNo: faker.location.buildingNumber(),
          localNo: faker.location.buildingNumber(),
          postalCode: faker.location.zipCode('##-###'),
        },
      },
      setting: {
        create: {
          theme: Theme.DARK,
          language: Language.EN,
        },
      },
    },
  });
}

async function generateEmployees() {
  await prisma.user.create({
    data: {
      email: 'user@zenith.com',
      password: await hashPassword('P0klik4$'),
      status: Status.ACTIVE,
      role: Roles.EMPLOYEE,
      permissions: [Permissions.USER_READ_SELF],
      personalInfo: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          phone: faker.phone.number(),
        },
      },
      address: {
        create: {
          country: faker.location.country(),
          city: faker.location.city(),
          street: faker.location.street(),
          buildingNo: faker.location.buildingNumber(),
          localNo: faker.location.buildingNumber(),
          postalCode: faker.location.zipCode('##-###'),
        },
      },
      setting: {
        create: {
          theme: Theme.LIGHT,
          language: Language.EN,
        },
      },
    },
  });

  for (let i = 0; i < randomUsersCount; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: await hashPassword('P0klik4$'),
        status: Status.INACTIVE,
        personalInfo: {
          create: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phone: faker.phone.number(),
          },
        },
        address: {
          create: {
            country: faker.location.country(),
            city: faker.location.city(),
            street: faker.location.street(),
            buildingNo: faker.location.buildingNumber(),
            localNo: faker.location.buildingNumber(),
            postalCode: faker.location.zipCode('##-###'),
          },
        },
        setting: {
          create: {
            theme: Theme.LIGHT,
            language: Language.EN,
          },
        },
      },
    });
  }
}

async function generatePayGrades() {
  await prisma.payGrade.create({
    data: {
      gradeCode: 'p1',
      gradeName: 'physical_1',
      minSalary: 3000,
      maxSalary: 5000,
      description: faker.lorem.paragraph(),
      requiredExperience: 0,
    },
  });
}

async function generateDepartments() {
  await prisma.department.create({
    data: {
      departmentCode: 'prod',
      departmentName: 'production',
      description: faker.lorem.paragraph(),
    },
  });
}

async function generatePositions() {
  await prisma.position.create({
    data: {
      positionTitle: 'junior operator',
      department: {
        connect: {
          departmentId: 1,
        },
      },
    },
  });
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomEnum<T extends object>(
  targetEnum: T,
  numerical = false,
): T[keyof T] {
  const enumValues = Object.keys(targetEnum)
    .map((n) => (numerical ? Number.parseInt(n) : n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

// EXECUTE
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
