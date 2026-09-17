# AI-logboek

## Wat ik al begrijp

- Dit is een custom, responsive WordPress-theme voor een software developer die een stage zoekt.
- De theme heeft een homepage, Over mij, Projecten en Contact.
- De stijl gebruikt goud, burgundy en een rustige lichte achtergrond.
- De drie projecten zijn een Todo List, een Muse-project met Raspberry Pi en een zelfgemaakte arcadecontroller/game.
- Projectdata staat centraal in `functions.php`; `header.php` en `footer.php` worden hergebruikt.
- Unsplash-afbeeldingen en contactgegevens zijn voorlopig placeholders.

## Wat ik nog niet weet

- Of de juiste WordPress-pagina's, slugs, homepage-instelling en navigatie al bestaan.
- Welke skills en hardware precies bij elk project horen.
- Hoe het Muse-project en de arcadecontroller technisch werken.
- Welke extra projecten in de bewijzenmap staan; daarvoor is toestemming nodig.
- Of de afbeeldingen, teksten en contactgegevens definitief geschikt zijn.
- Of de website al goed getest is op mobiel, toegankelijkheid en kleurcontrast.

## Wat later aangepast moet worden

- Vervang alle voorbeeldgegevens, teksten, skills, LinkedIn-link en afbeeldingen.
- Maak de WordPress-pagina's en het menu aan en stel de homepage in.
- Controleer de URL's en test de website in Docker op mobiel en desktop.
- Voeg eventueel echte project-casestudies en een contactformulier toe.
- Bekijk na toestemming de rest van de bewijzenmap voor extra projecten.

## Voorlopige keuzes

- De naam Othman, projectskills, URL's en contactgegevens zijn deels aangenomen.
- De projectafbeeldingen zijn willekeurige online placeholders.
- Projecten staan voorlopig als array in `functions.php`, niet als WordPress custom post type.
- De fallback-navigatie en korte projectteksten zijn eenvoudig gehouden.

## Templatehiërarchie en les 3

- `front-page.php` wordt gebruikt voor de statische homepage.
- `page.php` is de fallback voor gewone pagina's.
- `page-about.php` heeft voorrang voor de pagina Over mij.
- `functions.php` laadt de CSS en `script.js`.
- `post-thumbnails` maakt uitgelichte afbeeldingen mogelijk.

## Aangepast AI-resultaat (les 2)

- De profielfoto in de homepage is vergroot van 220px naar 260px op desktop en van 180px naar 210px op mobiel.
- Reden: de hero had rechts veel lege ruimte. De grotere foto maakt de homepage evenwichtiger en trekt meer aandacht naar het persoonlijke portfolio.

##  les 2 getest resultaten

- er waren geen nieuwe functionaliteit of paginas die getest moeten worden
- niks specifiek
- niks
- niks ging fout gelukkig

## Aanpassing profielfoto

- De foto staat nu links in de rechter hero-kolom.
- De desktopfoto is maximaal 300px breed en de mobiele foto maximaal 210px.
- De foto behoudt zijn ronde vorm en schaalt mee, zodat hij niet buiten het scherm valt.

## Testresultaat les 3

- Homepage, Over mij, de templatekoppen en `script.js` zijn gecontroleerd.
- Verwacht: de juiste templates en pagina-inhoud worden geladen.
- Resultaat: `front-page.php`, Over mij en `script.js` werkten correct.
- Fout: geen nieuwe fout gevonden. PHP was eerder al gecontroleerd met `php -l`.


Deze kritische controle is alleen in `ai-log.md` gezet. `prompt.md` is niet aangepast.
