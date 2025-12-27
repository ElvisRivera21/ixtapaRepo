-- CreateTable
CREATE TABLE "public"."Rsvp" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "partySize" INTEGER NOT NULL DEFAULT 1,
    "attending" BOOLEAN NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Rsvp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Rsvp_lastName_idx" ON "public"."Rsvp"("lastName");

-- CreateIndex
CREATE INDEX "Rsvp_email_idx" ON "public"."Rsvp"("email");
