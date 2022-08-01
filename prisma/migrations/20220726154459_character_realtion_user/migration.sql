-- CreateTable
CREATE TABLE "_FavoriteCharacterToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteCharacterToUser_AB_unique" ON "_FavoriteCharacterToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteCharacterToUser_B_index" ON "_FavoriteCharacterToUser"("B");

-- AddForeignKey
ALTER TABLE "_FavoriteCharacterToUser" ADD CONSTRAINT "_FavoriteCharacterToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "FavoriteCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteCharacterToUser" ADD CONSTRAINT "_FavoriteCharacterToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
