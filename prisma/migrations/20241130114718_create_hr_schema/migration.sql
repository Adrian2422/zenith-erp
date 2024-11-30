-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "hr";

-- CreateEnum
CREATE TYPE "hr"."Currency" AS ENUM ('PLN', 'USD', 'EUR', 'GBP');

-- CreateTable
CREATE TABLE "hr"."employee_profiles" (
    "employee_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "preferred_name" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "gender" TEXT,
    "nationality" TEXT,
    "marital_status" TEXT,
    "personal_email" TEXT,
    "phone_number" TEXT,
    "emergency_contact_name" TEXT,
    "emergency_contact_relationship" TEXT,
    "emergency_contact_phone" TEXT,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "employment_type" TEXT NOT NULL,
    "employment_status" "staff"."Status" NOT NULL DEFAULT 'INACTIVE',
    "probation_end_date" TIMESTAMP(3),
    "department_id" INTEGER,
    "position_id" INTEGER,
    "manager_id" INTEGER,
    "base_salary" DECIMAL(65,30),
    "salary_currency" "hr"."Currency" NOT NULL DEFAULT 'PLN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "payGradePayGradeId" INTEGER,

    CONSTRAINT "employee_profiles_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "hr"."departments" (
    "department_id" SERIAL NOT NULL,
    "department_code" TEXT NOT NULL,
    "department_name" TEXT NOT NULL,
    "parent_department_id" INTEGER,
    "department_head_id" INTEGER,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "hr"."positions" (
    "position_id" SERIAL NOT NULL,
    "position_title" TEXT NOT NULL,
    "department_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "hr"."employment_history" (
    "history_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "department_id" INTEGER,
    "position_id" INTEGER,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "reason_for_change" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employment_history_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "hr"."pay_grades" (
    "pay_grade_id" SERIAL NOT NULL,
    "grade_code" TEXT NOT NULL,
    "grade_name" TEXT NOT NULL,
    "min_salary" DECIMAL(65,30) NOT NULL,
    "max_salary" DECIMAL(65,30) NOT NULL,
    "description" TEXT,
    "required_experience" INTEGER,
    "required_education" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pay_grades_pkey" PRIMARY KEY ("pay_grade_id")
);

-- CreateTable
CREATE TABLE "hr"."_PayGradeToPosition" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PayGradeToPosition_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_profiles_user_id_key" ON "hr"."employee_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "departments_department_code_key" ON "hr"."departments"("department_code");

-- CreateIndex
CREATE UNIQUE INDEX "pay_grades_grade_code_key" ON "hr"."pay_grades"("grade_code");

-- CreateIndex
CREATE INDEX "_PayGradeToPosition_B_index" ON "hr"."_PayGradeToPosition"("B");

-- AddForeignKey
ALTER TABLE "hr"."employee_profiles" ADD CONSTRAINT "employee_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "staff"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr"."employee_profiles" ADD CONSTRAINT "employee_profiles_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "hr"."departments"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr"."employee_profiles" ADD CONSTRAINT "employee_profiles_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "hr"."positions"("position_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr"."employee_profiles" ADD CONSTRAINT "employee_profiles_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "hr"."employee_profiles"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr"."employee_profiles" ADD CONSTRAINT "employee_profiles_payGradePayGradeId_fkey" FOREIGN KEY ("payGradePayGradeId") REFERENCES "hr"."pay_grades"("pay_grade_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr"."positions" ADD CONSTRAINT "positions_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "hr"."departments"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr"."employment_history" ADD CONSTRAINT "employment_history_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "hr"."employee_profiles"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr"."employment_history" ADD CONSTRAINT "employment_history_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "hr"."departments"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr"."employment_history" ADD CONSTRAINT "employment_history_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "hr"."positions"("position_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr"."_PayGradeToPosition" ADD CONSTRAINT "_PayGradeToPosition_A_fkey" FOREIGN KEY ("A") REFERENCES "hr"."pay_grades"("pay_grade_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr"."_PayGradeToPosition" ADD CONSTRAINT "_PayGradeToPosition_B_fkey" FOREIGN KEY ("B") REFERENCES "hr"."positions"("position_id") ON DELETE CASCADE ON UPDATE CASCADE;
