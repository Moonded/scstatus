-- CreateTable
CREATE TABLE "Discovery" (
    "user" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "poi_type" TEXT NOT NULL,
    "celestrialbodyInput" TEXT NOT NULL,
    "locationInput" TEXT NOT NULL,
    "coordiantesInput" TEXT NOT NULL,
    "organisationInput" TEXT NOT NULL,
    "observationInput" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GuildSetting" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "serverUpload" BOOLEAN NOT NULL,
    "discoveryUploadURI" TEXT NOT NULL,
    "UploadUsers" TEXT[],

    CONSTRAINT "GuildSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "Platform" TEXT NOT NULL,
    "PersistentUniverse" TEXT NOT NULL,
    "PersistentTestUniverse" TEXT NOT NULL,
    "ElectronicAccess" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Galactapedia" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Discovery_uuid_key" ON "Discovery"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_id_key" ON "Guild"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GuildSetting_guildId_key" ON "GuildSetting"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Status_Platform_key" ON "Status"("Platform");

-- CreateIndex
CREATE UNIQUE INDEX "Status_PersistentUniverse_key" ON "Status"("PersistentUniverse");

-- CreateIndex
CREATE UNIQUE INDEX "Status_PersistentTestUniverse_key" ON "Status"("PersistentTestUniverse");

-- CreateIndex
CREATE UNIQUE INDEX "Status_ElectronicAccess_key" ON "Status"("ElectronicAccess");

-- CreateIndex
CREATE UNIQUE INDEX "Galactapedia_id_key" ON "Galactapedia"("id");

-- AddForeignKey
ALTER TABLE "GuildSetting" ADD CONSTRAINT "GuildSetting_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
