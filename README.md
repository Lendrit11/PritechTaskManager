# Pritech Task Manager 

Ky është një aplikacion mobile i ndërtuar me **React Native (Expo)** dhe **TypeScript** si pjesë e testit teknik për kompaninë **PRITECH**. Aplikacioni menaxhon detyrat ditore duke u lidhur me një API publik dhe duke i ruajtur ato lokalisht në pajisje.

---

##  Karakteristikat e Implementuara (Features)

### Kërkesat Kryesore (Core Requirements)
* **Marrja e të dhënave nga API:** Leximi fillestar i detyrave bëhet nga API publik (`jsonplaceholder`).
* **Menaxhimi i Taskeve:** Mundësia për të shtuar taske të reja, për t'i fshirë ato dhe për të ndryshuar statusin (Kryer / E hapur).
* **Komponentë të Ripërdorshëm:** Ndarje e pastër e kodit në komponentë si `TaskCard` dhe `EmptyState`.
* **TypeScript:** Kontroll i plotë i tipave të të dhënave për siguri maksimale të kodit.

### Pikat BONUS të Implementuara
* **Search:** Kërkimi i taskeve në kohë reale sipas titullit.
* **Filter:** Filtrimi i shpejtë i detyrave sipas statusit (*Të gjitha*, *E hapur*, *Kryer*).
* **AsyncStorage:** Ruajtja e të dhënave në memorien e fshehtë të pajisjes (të dhënat nuk humbasin pas rifreskimit).
* **Navigation:** Navigim i pastër mes ekranit kryesor (`Home`) dhe ekranit të detajeve (`TaskDetails`) duke përdorur *React Navigation Stack*.

---

##  Arkitektura dhe Struktura e Kodit

Projekti ndjek parimin e **Clean Code** dhe është i organizuar në mënyrë modulare brenda folderit `src/`:
* `components/` - Komponentët UI të ripërdorshëm (`TaskCard`, `EmptyState`).
* `context/` - Menaxhimi i gjendjes globale përmes Context API (`TaskContext`).
* `screens/` - Ekranet kryesore të aplikacionit.
* `types/` - Deklarimi i tipave dhe ndërfaqeve të TypeScript.

---

## Udhëzimet e Instalimit dhe Ekzekutimit (Setup)

Për ta ekzekutuar projektin në kompjuterin tuaj, ndiqni këto hapa:

1. Klononi repositorin:
   ```bash
   git clone https://github.com/Lendrit11/PritechTaskManager.git
   cd PritechTaskManager

2. Instaloni varësitë (dependencies):
  npm install

3. Ekzekutoni aplikacionin
Për Web (Google Chrome ):
 npm run web

4. Për Telefon (Expo Go - iOS/Android):
     * **Opsioni 1: Përmes Rrjetit Lokal **
     npx expo start
     *Sigurohuni që telefoni dhe kompjuteri janë të lidhur në të njëjtin Wi-Fi (Network).*

   Skenoni QR kodin e gjeneruar në terminal me kamerën e telefonit tuaj (iOS) ose përmes aplikacionit Expo Go (Android)
 * **Opsioni 2: Përmes Tunelit (Nëse Opsioni 1 jep gabim ose bllokohet)**
     npx expo start --tunnel
   
     *Përdoret nëse kompjuteri dhe telefoni nuk janë në të njëjtin rrjet Wi-Fi.*
   Skenoni QR kodin e gjeneruar në terminal me kamerën e telefonit tuaj (iOS) ose përmes aplikacionit Expo Go (Android)

 
