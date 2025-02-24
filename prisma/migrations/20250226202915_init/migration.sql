-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "staff";

-- CreateEnum
CREATE TYPE "staff"."Roles" AS ENUM ('SUPERUSER', 'ADMIN', 'EMPLOYEE', 'GUEST');

-- CreateEnum
CREATE TYPE "staff"."Permissions" AS ENUM ('USER_READ_SELF', 'USER_READ', 'USER_CREATE', 'USER_EDIT', 'USER_DELETE', 'USER_BLOCK', 'USER_UNBLOCK');

-- CreateEnum
CREATE TYPE "staff"."Status" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "staff"."Theme" AS ENUM ('LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "staff"."Language" AS ENUM ('EN', 'PL');

-- CreateTable
CREATE TABLE "staff"."users" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "staff"."Roles" NOT NULL DEFAULT 'EMPLOYEE',
    "permissions" "staff"."Permissions"[] DEFAULT ARRAY['USER_READ_SELF']::"staff"."Permissions"[],
    "status" "staff"."Status" NOT NULL DEFAULT 'INACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "staff"."personal_infos" (
    "personal_info_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "personal_infos_pkey" PRIMARY KEY ("personal_info_id")
);

-- CreateTable
CREATE TABLE "staff"."addresses" (
    "address_id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "building_no" TEXT,
    "local_no" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "staff"."settings" (
    "setting_id" SERIAL NOT NULL,
    "theme" "staff"."Theme" NOT NULL DEFAULT 'LIGHT',
    "language" "staff"."Language" NOT NULL DEFAULT 'EN',
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("setting_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "staff"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "personal_infos_user_id_key" ON "staff"."personal_infos"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_user_id_key" ON "staff"."addresses"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "settings_user_id_key" ON "staff"."settings"("user_id");

-- AddForeignKey
ALTER TABLE "staff"."personal_infos" ADD CONSTRAINT "personal_infos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "staff"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff"."addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "staff"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff"."settings" ADD CONSTRAINT "settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "staff"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
