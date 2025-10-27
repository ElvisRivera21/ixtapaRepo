/*
  Warnings:

  - You are about to drop the `RSVP` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."RSVP" DROP CONSTRAINT "RSVP_guestId_fkey";

-- DropTable
DROP TABLE "public"."RSVP";
