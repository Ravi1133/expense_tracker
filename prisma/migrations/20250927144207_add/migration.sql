-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE';
