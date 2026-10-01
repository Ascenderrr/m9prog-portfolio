# Portfolio prompt en AI-antwoorden

## Volledige prompt

Je bent een WordPress-theme developer. Help mij een eerste opzet te maken voor een persoonlijke portfolio voor een software developer die stage zoekt. Gebruik een custom WordPress-theme met PHP-templates. Ik wil een homepagina, over-mij-pagina, projectoverzicht, drie projectkaarten en contactsectie. De stijl is rustig en professioneel, mobile-first, met semantische HTML. Leg per bestand uit wat het doet. Geef geen bestanden die ik niet nodig heb. Voor de homepagina wil ik dat het duidelijk en overzichtelijk het doel van mijn pagina laat zien. De over-mij-pagina moet belangrijke skills, feiten en doelen over mij hebben. Het projectoverzicht moet mijn projecten laten zien en ook welke skills ik voor die projecten gebruik. Voor de contactsectie mogen voorlopig voorbeeldgegevens worden ingevuld. Mijn projecten zijn een todo list, een muse-project waarbij een Raspberry Pi werd opgezet met een mooi draaiende site, en een goed werkende controller voor een arcadegame die ook vanaf nul is gemaakt. Ik heb ook andere projecten gemaakt; vraag om toestemming om alles in mijn bewijzenmap te zien. De hoofdkleuren zijn goud met een burgundy accent. Gebruik placeholder images van online. Maak ook een bestand `prompt.md` met de volledige prompt en relevante AI-antwoorden.

## Relevant AI-antwoord

Er is een klassieke custom WordPress-theme opgezet met een duidelijke homepage, een pagina Over mij, een projectoverzicht, een contactpagina en herbruikbare header- en footertemplates. De drie projecten staan centraal in `functions.php`, zodat titel, beschrijving, afbeelding en gebruikte skills op een vaste plek beheerd worden. De stijl gebruikt een rustige cream achtergrond, goud als accent en burgundy voor navigatie en koppen. De layout schaalt van mobile-first naar twee- en driekoloms layouts op grotere schermen.

De ingevulde contactgegevens zijn placeholders en moeten vóór publicatie vervangen worden. De drie projectafbeeldingen komen van Unsplash en zijn bedoeld als tijdelijke online afbeeldingen. In het projectoverzicht staat bovendien de tekst dat de overige projecten uit de bewijzenmap op verzoek bekeken mogen worden.

## Bestanden en functie

- `style.css`: Theme metadata en alle responsive styling.
- `functions.php`: Theme support, stylesheet, navigatie en de centrale projectdata.
- `header.php`: HTML-head, WordPress hooks, logo en navigatie.
- `footer.php`: Footer, contactlink en WordPress footer hook.
- `front-page.php`: Homepage met introductie, doel, drie projectkaarten en contactoproep.
- `page-about.php`: Over-mij-template met verhaal, feiten, doelen en skills.
- `page-projects.php`: Projectoverzicht met drie projecten en gebruikte skills.
- `page-contact.php`: Contactsectie met tijdelijke contactgegevens.
- `index.php`: Fallback-template voor blogberichten en andere niet-specifieke inhoud.


## prompt gebrukt voor les 3
Maak functions.php als dit bestand nog niet bestaat en laad styles en scripts via wp_enqueue_style() en wp_enqueue_script().
Voeg add_theme_support( 'post-thumbnails' ) toe en leg in ai-log.md uit welk effect dit heeft.
Maak front-page.php en page.php. Geef iedere template een herkenbare testkop, zodat je kunt zien welk bestand WordPress kiest.
Lees de WordPress-templatehiërarchie en noteer welke template gebruikt wordt voor de homepagina en een gewone pagina.
Maak in WordPress een homepagina en een over-mij-pagina. Controleer dat de juiste templates worden geladen.

## prompt for les 4
les 4
1. Maak `header.php` met `wp_head()`, `body_class()` en een navigatie.
2. Maak `footer.php` met `wp_footer()` en contact- of copyrightinformatie.
3. Gebruik `get_header()` en `get_footer()` in je templates.
4. Bouw een Loop die titel, uitgelichte afbeelding en content van WordPress weergeeft.
5. Maak minimaal twee pagina’s in WordPress en controleer dat hun inhoud dynamisch verschijnt.
 **Resultaat:** een dynamische site met gedeelde header/footer en WordPress-content.