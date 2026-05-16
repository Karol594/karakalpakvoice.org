from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import Paragraph, Spacer, HRFlowable, KeepTogether, PageBreak
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib import colors
from reportlab.platypus import Image
import os

# — Czcionki ——————————————————————————————————————————————————————————————
pdfmetrics.registerFont(TTFont('DejaVu',      'C:/Windows/Fonts/times.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuBold',  'C:/Windows/Fonts/timesbd.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuIt',    'C:/Windows/Fonts/timesi.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans',  'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSansB', 'C:/Windows/Fonts/arialbd.ttf'))

PAGE_W, PAGE_H = A4
MARGIN   = 2.5 * cm
YEAR     = "2019"
EMBLEM   = "emblem.jpg"
SITE_URL = "https://www.karakalpakvoice.org"

DARK_BLUE  = colors.HexColor('#0d2b4e')
MID_BLUE   = colors.HexColor('#1a4a7a')
LIGHT_BLUE = colors.HexColor('#2c6fad')
GOLD       = colors.HexColor('#b8860b')
GRAY       = colors.HexColor('#555555')
LIGHT_GRAY = colors.HexColor('#cccccc')
LINK_COLOR = colors.HexColor('#1a4a7a')

# — Style ————————————————————————————————————————————————————————————————
def make_styles():
    return {
        'cover_republic': ParagraphStyle(
            'cover_republic', fontName='DejaVuBold', fontSize=13,
            textColor=DARK_BLUE, alignment=TA_CENTER, spaceAfter=4, leading=16),
        'cover_title': ParagraphStyle(
            'cover_title', fontName='DejaVuBold', fontSize=22,
            textColor=DARK_BLUE, alignment=TA_CENTER, spaceAfter=10, leading=28),
        'cover_adopted': ParagraphStyle(
            'cover_adopted', fontName='DejaVu', fontSize=10,
            textColor=MID_BLUE, alignment=TA_CENTER, spaceAfter=4, leading=14),
        'cover_amendments': ParagraphStyle(
            'cover_amendments', fontName='DejaVuIt', fontSize=8.5,
            textColor=GRAY, alignment=TA_CENTER, spaceAfter=4, leading=12),
        'cover_year': ParagraphStyle(
            'cover_year', fontName='DejaVuBold', fontSize=16,
            textColor=LIGHT_BLUE, alignment=TA_CENTER, spaceAfter=6, leading=20),
        'cover_site': ParagraphStyle(
            'cover_site', fontName='DejaVuSans', fontSize=9,
            textColor=GRAY, alignment=TA_CENTER, spaceAfter=2, leading=12),
        'cover_link': ParagraphStyle(
            'cover_link', fontName='DejaVuSans', fontSize=9,
            textColor=LINK_COLOR, alignment=TA_CENTER, spaceAfter=2, leading=12),
        'preamble_title': ParagraphStyle(
            'preamble_title', fontName='DejaVuBold', fontSize=13,
            textColor=DARK_BLUE, alignment=TA_CENTER,
            spaceBefore=14, spaceAfter=8, leading=18),
        'preamble_text': ParagraphStyle(
            'preamble_text', fontName='DejaVu', fontSize=10,
            textColor=colors.black, alignment=TA_JUSTIFY, spaceAfter=8, leading=15),
        'section_title': ParagraphStyle(
            'section_title', fontName='DejaVuBold', fontSize=12,
            textColor=DARK_BLUE, alignment=TA_CENTER,
            spaceBefore=16, spaceAfter=6, leading=16),
        'chapter_title': ParagraphStyle(
            'chapter_title', fontName='DejaVuBold', fontSize=11,
            textColor=MID_BLUE, alignment=TA_CENTER,
            spaceBefore=12, spaceAfter=5, leading=15),
        'article_title': ParagraphStyle(
            'article_title', fontName='DejaVuBold', fontSize=10,
            textColor=DARK_BLUE, alignment=TA_LEFT,
            spaceBefore=8, spaceAfter=3, leading=14),
        'article_text': ParagraphStyle(
            'article_text', fontName='DejaVu', fontSize=10,
            textColor=colors.black, alignment=TA_JUSTIFY, spaceAfter=5, leading=15),
    }

S = make_styles()

# — Naglowek / Stopka ———————————————————————————————————————————————————
def make_page_template(doc):
    def header_footer(canvas, doc):
        canvas.saveState()
        w, h = PAGE_W, PAGE_H

        canvas.setStrokeColor(LIGHT_BLUE)
        canvas.setLineWidth(1.2)
        canvas.line(MARGIN, h - MARGIN + 0.4*cm, w - MARGIN, h - MARGIN + 0.4*cm)

        canvas.setFont('DejaVuSans', 8)
        canvas.setFillColor(MID_BLUE)
        canvas.drawString(MARGIN, h - MARGIN + 0.6*cm,
                          "KONSTYTUCJA REPUBLIKI KARAKALPAKSTANU")
        canvas.drawRightString(w - MARGIN, h - MARGIN + 0.6*cm, "ROK " + YEAR)

        canvas.setStrokeColor(LIGHT_BLUE)
        canvas.setLineWidth(0.8)
        canvas.line(MARGIN, MARGIN - 0.3*cm, w - MARGIN, MARGIN - 0.3*cm)

        canvas.setFont('DejaVuSans', 8)
        canvas.setFillColor(GRAY)
        canvas.drawCentredString(w / 2, MARGIN - 0.55*cm, str(doc.page))

        site_text = "www.karakalpakvoice.org"
        canvas.setFillColor(LINK_COLOR)
        text_width = canvas.stringWidth(site_text, 'DejaVuSans', 8)
        x_start = w - MARGIN - text_width
        y_pos   = MARGIN - 0.55*cm
        canvas.drawString(x_start, y_pos, site_text)
        canvas.linkURL(SITE_URL,
                       (x_start, y_pos - 2, x_start + text_width, y_pos + 8),
                       relative=0)
        canvas.restoreState()

    frame = Frame(MARGIN, MARGIN, PAGE_W - 2*MARGIN, PAGE_H - 2*MARGIN, id='main')
    return PageTemplate(id='main', frames=[frame], onPage=header_footer)

# — Strona tytulowa ————————————————————————————————————————————————————
def build_cover():
    s = []
    s.append(Spacer(1, 1.5*cm))
    if os.path.exists(EMBLEM):
        img = Image(EMBLEM, width=4.5*cm, height=4.5*cm)
        img.hAlign = 'CENTER'
        s.append(img)
    s.append(Spacer(1, 0.6*cm))
    s.append(HRFlowable(width="80%", thickness=2, color=GOLD,
                         hAlign='CENTER', spaceAfter=10))
    s.append(Paragraph("REPUBLIKA KARAKALPAKSTANU", S['cover_republic']))
    s.append(Spacer(1, 0.3*cm))
    s.append(Paragraph("KONSTYTUCJA", S['cover_title']))
    s.append(Spacer(1, 0.3*cm))
    s.append(HRFlowable(width="60%", thickness=1.5, color=LIGHT_BLUE,
                         hAlign='CENTER', spaceAfter=8))
    s.append(Paragraph(
        "DWUNASTEGO ZWOŁANIA RADY NAJWYŻSZEJ REPUBLIKI KARAKALPAKSTANU<br/>"
        "PRZYJĘTA NA DWUNASTEJ SESJI 9 KWIETNIA 1993 ROKU",
        S['cover_adopted']))
    
    s.append(Spacer(1, 0.4*cm))

    # — AMENDMENTS BLOCK (FULL POLISH VERSION) —
    amendments_pl = (
        "(Zmiany i uzupełnienia zostały wprowadzone: na piętnastej sesji Rady Najwyższej Republiki Karakalpakstanu "
        "dwunastego zwołania 26 lutego 1994 r., na trzynastej sesji Żokargy Kenesu Republiki Karakalpakstanu pierwszej kadencji "
        "31 października 1995 r., na trzynastej sesji Żokargy Kenesu Republiki Karakalpakstanu pierwszej kadencji 15 grudnia 1997 r., "
        "na dwunastej sesji Żokargy Kenesu Republiki Karakalpakstanu drugiej kadencji 12 listopada 2003 r., "
        "na piętnastej sesji Żokargy Kenesu Republiki Karakalpakstanu 27 czerwca 2014 r., "
        "na dwudziestej szóstej sesji Żokargy Kenesu Republiki Karakalpakstanu 29 czerwca 2019 r. "
        "oraz na dwudziestej dziewiątej sesji Żokargy Kenesu Republiki Karakalpakstanu 16 grudnia 2019 r.)"
    )
    
    s.append(Paragraph(amendments_pl, S['cover_amendments']))
    s.append(Spacer(1, 1.2*cm))
    s.append(HRFlowable(width="50%", thickness=1, color=LIGHT_GRAY,
                         hAlign='CENTER', spaceAfter=10))
    s.append(Paragraph(YEAR, S['cover_year']))
    s.append(HRFlowable(width="50%", thickness=1, color=LIGHT_GRAY,
                         hAlign='CENTER', spaceAfter=10))
    s.append(Spacer(1, 1.0*cm))
    s.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">www.karakalpakvoice.org</link>',
        S['cover_link']))
    s.append(Paragraph(
        "Karakalpakstan — republika suwerenna | Dokument archiwalny",
        S['cover_site']))
    s.append(PageBreak())
    return s

# — Funkcje pomocnicze ————————————————————————————————————————————————
def art(num, text):
    items = [Paragraph("Artykul " + str(num) + ".", S['article_title'])]
    for para in text.strip().split('\n'):
        para = para.strip()
        if para:
            items.append(Paragraph(para, S['article_text']))
    return KeepTogether(items)

def section(text):
    return Paragraph(text, S['section_title'])

def chapter(text):
    return Paragraph(text, S['chapter_title'])

def hr_gold():
    return HRFlowable(width="40%", thickness=1.5, color=GOLD,
                      hAlign='CENTER', spaceBefore=4, spaceAfter=4)

def hr_blue():
    return HRFlowable(width="100%", thickness=0.5, color=LIGHT_BLUE,
                      hAlign='CENTER', spaceBefore=6, spaceAfter=6)

# — Tresc ————————————————————————————————————————————————————————————————
def build_content():
    s = []

    # PREAMBUŁA
    s.append(Paragraph("PREAMBUŁA", S['preamble_title']))
    s.append(hr_gold())
    s.append(Paragraph(
        "Narod Republiki Karakalpakstanu, uroczyście proklamujac swoje przywiazanie do praw "
        "czlowieka i zasad suwerennosci panstwowej, swiadomy wysokiej odpowiedzialnosci wobec "
        "obecnych i przyszlych pokolen, opierajac sie na historycznym doswiadczeniu rozwoju "
        "karakalpackiej panstwowosci, potwierdzajac swoja wiernosc idealom demokracji i "
        "sprawiedliwosci spolecznej, uznajac nadrzetnosc powszechnie przyjętych norm prawa "
        "miedzynarodowego, dazac do zapewnienia godnego zycia obywatelom republiki, stawiajac "
        "sobie za cel stworzenie humanitarnego, demokratycznego panstwa prawnego, w imie "
        "zapewnienia pokoju obywatelskiego i zgody narodowej, poprzez swoich upowaznionych "
        "przedstawicieli przyjmuje niniejsza Konstytucje Republiki Karakalpakstanu.",
        S['preamble_text']))

    # CZESC PIERWSZA
    s.append(PageBreak())
    s.append(section("CZESC PIERWSZA\nPODSTAWOWE ZASADY"))
    s.append(hr_blue())

    s.append(chapter("ROZDZIAL I\nSUWERENNOSC PANSTWOWA"))
    s.append(art(1,
        "Karakalpakstan jest suwerenna, demokratyczna republika wchodzaca w sklad Republiki "
        "Uzbekistanu. Nazwy panstwa 'Republika Karakalpakstanu' i 'Karakalpakstan' sa "
        "rownowazne.\n"
        "Wzajemne stosunki Republiki Uzbekistanu i Republiki Karakalpakstanu regulowane sa "
        "w ramach Konstytucji Republiki Uzbekistanu przez traktaty i umowy zawierane miedzy "
        "Republika Uzbekistanu a Republika Karakalpakstanu.\n"
        "Republika Karakalpakstanu posiada prawo wystapienia ze skladu Republiki Uzbekistanu "
        "na podstawie powszechnego referendum narodu Karakalpakstanu."))
    s.append(art(2,
        "Panstwo wyraza wole narodu i sluzy jego interesom. Organy panstwowe i funkcjonariusze "
        "publiczni sa odpowiedzialni przed spoleczenstwem i obywatelami."))
    s.append(art(3,
        "Republika Karakalpakstanu samodzielnie rozstrzyga kwestie swojego podzialu "
        "administracyjno-terytorialnego, okresla system organow wladzy panstwowej i "
        "administracji, prowadzi polityke zgodna z polityka Republiki Uzbekistanu.\n"
        "Terytorium i granice Republiki Karakalpakstanu sa nienaruszalne i nie moga byc "
        "zmieniane ani dzielone."))
    s.append(art(4,
        "Jezyk karakalpacki i jezyk uzbecki sa jezykami panstwowymi Republiki Karakalpakstanu.\n"
        "Republika Karakalpakstanu zapewnia poszanowanie jezykow, zwyczajow i tradycji narodow "
        "i grup etnicznych zamieszkujacych jej terytorium oraz stwarza warunki dla ich "
        "rozwoju."))
    s.append(art(5,
        "Republika Karakalpakstanu posiada wlasne symbole panstwowe zatwierdzone ustawa: "
        "flage, herb i hymn."))
    s.append(art(6, "Stolica Republiki Karakalpakstanu jest miasto Nukus."))

    s.append(chapter("ROZDZIAL II\nWLADZA NARODU"))
    s.append(art(7,
        "Narod jest jedynym zrodlem wladzy panstwowej.\n"
        "Wladza panstwowa w Republice Karakalpakstanu sprawowana jest w interesie narodu "
        "wylacznie przez organy, ktorym uprawnienia takie zostaly nadane przez Konstytucje "
        "Republiki Karakalpakstanu i ustawy przyjete na jej podstawie.\n"
        "Przywlaszczanie sobie uprawnien wladzy panstwowej, zawieszanie lub zaprzestanie "
        "dzialalnosci organow wladzy w sposob nieprzewidziany Konstytucja, a takze tworzenie "
        "nowych lub rownoleglych struktur wladzy sa dzialaniami antykonstytucyjnymi i pociagaja "
        "za soba odpowiedzialnosc prawna."))
    s.append(art(8,
        "Narod Karakalpakstanu, niezaleznie od narodowosci, tworzy obywateli Republiki "
        "Karakalpakstanu."))
    s.append(art(9,
        "Najwazniejsze kwestie zycia spolecznego i panstwowego poddaje sie pod dyskusje "
        "narodu i pod glosowanie powszechne (referendum). Tryb przeprowadzania referendum "
        "okresla ustawa."))
    s.append(art(10,
        "W imieniu narodu Karakalpakstanu moze wystepowac jedynie wybrany przez niego Jokargy "
        "Kenes Republiki.\n"
        "Zadna czesc spoleczenstwa, partia polityczna, organizacja spoleczna, ruch ani osoba "
        "prywatna nie moga wystepowac w imieniu narodu Karakalpakstanu."))
    s.append(art(11,
        "System wladzy panstwowej Republiki Karakalpakstanu opiera sie na zasadzie podzialu "
        "wladzy na ustawodawcza, wykonawcza i sadownicza."))
    s.append(art(12,
        "Zycie spoleczne w Republice Karakalpakstanu rozwija sie na podstawie roznorodnosci "
        "instytucji politycznych, ideologii i pogladow.\n"
        "Zadna ideologia nie moze byc ustanowiona jako oficjalna ideologia panstwowa."))
    s.append(art(13,
        "Demokracja w Republice Karakalpakstanu opiera sie na powszechnych zasadach "
        "humanistycznych, zgodnie z ktorymi czlowiek, jego zycie, wolnosc, honor, godnosc "
        "i inne niezbywalne prawa stanowia najwyzsza wartosc.\n"
        "Demokratyczne prawa i wolnosci sa chronione przez Konstytucje i ustawy."))
    s.append(art(14,
        "Panstwo opiera swoja dzialalnosc na zasadach sprawiedliwosci spolecznej i "
        "praworzadnosci, kierujac sie interesem dobrobytu czlowieka i spoleczenstwa."))

    s.append(chapter("ROZDZIAL III\nNACZELNA MOC KONSTYTUCJI I PRAWA"))
    s.append(art(15,
        "W Republice Karakalpakstanu uznaje sie bezwzgledne nadrzetstwo Konstytucji i ustaw "
        "Republiki Uzbekistanu oraz Republiki Karakalpakstanu.\n"
        "Panstwo, jego organy, funkcjonariusze publiczni, organizacje spoleczne i obywatele "
        "dzialaja zgodnie z Konstytucja i ustawami."))
    s.append(art(16,
        "Zaden przepis niniejszej Konstytucji nie moze byc interpretowany na szkode praw i "
        "interesow Republiki Karakalpakstanu.\n"
        "Zadna ustawa ani inny akt normatywno-prawny nie moze byc sprzeczny z normami i "
        "zasadami Konstytucji."))

    s.append(chapter("ROZDZIAL IV\nSTOSUNKI MIEDZYNARODOWE I ZEWNETRZNO-EKONOMICZNE\nREPUBLIKI KARAKALPAKSTANU"))
    s.append(art(17,
        "Miedzynarodowe stosunki naukowe, kulturalne i zewnetrzno-ekonomiczne Republiki "
        "Karakalpakstanu sa realizowane zgodnie z ustawodawstwem Republiki Uzbekistanu i "
        "Republiki Karakalpakstanu."))

    # CZESC DRUGA
    s.append(PageBreak())
    s.append(section("CZESC DRUGA\nPODSTAWOWE PRAWA, WOLNOSCI I OBOWIAZKI\nCZLOWIEKA I OBYWATELA"))
    s.append(hr_blue())

    s.append(chapter("ROZDZIAL V\nPOSTANOWIENIA OGOLNE"))
    s.append(art(18,
        "Wszyscy obywatele Republiki Karakalpakstanu maja rowne prawa i wolnosci oraz sa "
        "rowni wobec prawa bez wzgledu na plec, rase, narodowosc, jezyk, religie, "
        "pochodzenie spoleczne, przekonania, status osobisty i spoleczny.\n"
        "Ulgi moga byc ustanawiane wylacznie ustawa i musza odpowiadac zasadom "
        "sprawiedliwosci spolecznej."))
    s.append(art(19,
        "Obywatel Republiki Karakalpakstanu i panstwo sa zwiazani wzajemnymi prawami i "
        "wzajemna odpowiedzialnoscia. Prawa i wolnosci obywateli ustanowione w Konstytucji "
        "i ustawach sa nienaruszalne i nikt nie ma prawa pozbawic ich lub ograniczyc bez "
        "orzeczenia sadu."))
    s.append(art(20,
        "Korzystanie przez obywatela z jego praw i wolnosci nie moze naruszac prawnie "
        "chronionych interesow, praw i wolnosci innych osob, panstwa ani spoleczenstwa."))

    s.append(chapter("ROZDZIAL VI\nOBYWATELSTWO"))
    s.append(art(21,
        "Zgodnie z zasada jednolitego obywatelstwa obowiazujaca w Republice Uzbekistanu, "
        "kazdy obywatel Republiki Karakalpakstanu jest jednoczesnie obywatelem Republiki "
        "Uzbekistanu.\n"
        "Podstawy i tryb nabycia oraz utraty obywatelstwa okresla Ustawa Republiki "
        "Uzbekistanu o obywatelstwie.\n"
        "Cudzoziemcom i osobom bez obywatelstwa przebywajacym na terytorium Republiki "
        "Karakalpakstanu zapewnia sie prawa i wolnosci zgodnie z normami prawa "
        "miedzynarodowego. Podlegaja oni obowiazkom ustanowionym Konstytucja i ustawami "
        "Republiki Karakalpakstanu oraz umowami miedzynarodowymi Republiki Uzbekistanu."))

    s.append(chapter("ROZDZIAL VII\nPRAWA I WOLNOSCI OSOBISTE"))
    s.append(art(22,
        "Prawo do zycia jest niezbywalnym prawem kazdego czlowieka. Zamach na nie jest "
        "najciezszym przestepstwem."))
    s.append(art(23,
        "Kazdy ma prawo do wolnosci i nietykalnosci osobistej. Nikt nie moze byc "
        "aresztowany ani przetrzymywany inaczej niz na podstawie ustawy."))
    s.append(art(24,
        "Kazdy oskarzony o popelnienie przestepstwa uwaza sie za niewinnego, dopoki jego "
        "wina nie zostanie udowodniona w trybie przewidzianym prawem, w jawnym "
        "postepowaniu sadowym, w ktorym zapewnia mu sie wszelkie mozliwosci obrony.\n"
        "Nikt nie moze byc poddawany torturam, przemocy ani innemu okrutnemu lub "
        "ponizajacemu traktowaniu.\n"
        "Nikt nie moze byc poddawany eksperymentom medycznym lub naukowym bez swojej zgody."))
    s.append(art(25,
        "Kazdy ma prawo do ochrony przed zamachem na jego honor i godnosc, przed ingerencja "
        "w zycie prywatne oraz do nietykalnosci mieszkania.\n"
        "Nikt nie ma prawa wejsc do mieszkania, dokonac przeszukania lub ogledzitn, naruszyc "
        "tajemnicy korespondencji i rozmow telefonicznych inaczej niz w przypadkach i trybie "
        "przewidzianych ustawa."))
    s.append(art(26,
        "Obywatel Republiki Karakalpakstanu, bedac obywatelem Republiki Uzbekistanu, ma "
        "prawo do swobodnego poruszania sie po terytorium Republiki Uzbekistanu, wjazdu do "
        "niej i wyjazdu z niej, z wyjatkiem ograniczen ustanowionych ustawa."))
    s.append(art(27,
        "Kazdy ma prawo do wolnosci mysli, slowa i przekonan.\n"
        "Kazdy ma prawo poszukiwac, otrzymywac i rozpowszechniac dowolne informacje, "
        "z wyjatkiem informacji skierowanych przeciwko istniejacemu porzadkowi "
        "konstytucyjnemu oraz innych ograniczen przewidzianych ustawa.\n"
        "Wolnosc pogladow i ich wyrazania moze byc ograniczona ustawa ze wzgledu na ochrone "
        "tajemnicy panstwowej lub innej tajemnicy chronionej prawem."))
    s.append(art(28,
        "Wszystkie organy panstwowe, organizacje spoleczne i funkcjonariusze publiczni "
        "Republiki Karakalpakstanu sa zobowiazani zapewnic obywatelom mozliwosc zapoznania "
        "sie z dokumentami, decyzjami i innymi materialami dotyczacymi ich praw i "
        "interesow."))
    s.append(art(29,
        "Wolnosc sumienia jest gwarantowana wszystkim. Kazdy ma prawo wyznawac dowolna "
        "religie lub nie wyznawac zadnej. Niedopuszczalne jest przymusowe narzucanie "
        "pogladow religijnych."))

    s.append(chapter("ROZDZIAL VIII\nPRAWA POLITYCZNE"))
    s.append(art(30,
        "Obywatele Republiki Karakalpakstanu maja prawo do uczestniczenia w zarzadzaniu "
        "sprawami spoleczenstwa i panstwa, zarowno bezposrednio, jak i za posrednictwem "
        "swoich przedstawicieli. Udzial ten realizowany jest poprzez samorzadnosc, "
        "przeprowadzanie referendow i demokratyczne formowanie organow panstwowych."))
    s.append(art(31,
        "Obywatele maja prawo do realizowania swojej aktywnosci spolecznej w formie "
        "wiecow, zgromadzen i demonstracji, zgodnie z ustawodawstwem Republiki "
        "Karakalpakstanu.\n"
        "Organy wladzy maja prawo wstrzymac lub zakazac przeprowadzania tych wydarzen "
        "wylacznie z uzasadnionych wzgledow bezpieczenstwa."))
    s.append(art(32,
        "Obywatele Republiki Karakalpakstanu maja prawo zrzeszac sie w zwiazki zawodowe, "
        "partie polityczne i inne stowarzyszenia spoleczne oraz uczestniczyc w ruchach "
        "masowych.\n"
        "Nikt nie moze naruszac praw, wolnosci i godnosci osob stanowiacych mniejszosc "
        "opozycyjna w partiach politycznych, stowarzyszeniach spolecznych, ruchach masowych "
        "oraz w przedstawicielskich organach wladzy."))
    s.append(art(33,
        "Kazdy ma prawo, zarowno indywidualnie, jak i wspolnie z innymi osobami, zwracac "
        "sie z wnioskami, propozycjami i skargami do wlasciwych organow panstwowych, "
        "instytucji lub przedstawicieli ludowych.\n"
        "Wnioski, propozycje lub skargi musza byc rozpatrzone w trybie i terminach "
        "okreslonych ustawa."))

    s.append(chapter("ROZDZIAL IX\nPRAWA EKONOMICZNE I SOCJALNE"))
    s.append(art(34,
        "Kazdy ma prawo do wlasnosci. Tajemnica wkladow bankowych oraz prawo dziedziczenia "
        "sa gwarantowane ustawa."))
    s.append(art(35,
        "Kazdy ma prawo do pracy, do swobodnego wyboru zatrudnienia, do sprawiedliwych "
        "warunkow pracy oraz do ochrony przed bezrobociem, w trybie okreslonym ustawa.\n"
        "Zakazuje sie pracy przymusowej, z wyjatkiem wykonywania kary na podstawie wyroku "
        "sadu lub w innych przypadkach przewidzianych przez prawo."))
    s.append(art(36,
        "Pracownicy najemni maja prawo do platnego wypoczynku. Czas pracy oraz wymiar "
        "platnego urlopu wypoczynkowego okresla ustawa."))
    s.append(art(37,
        "Kazdy ma prawo do zabezpieczenia spolecznego na starosc, w przypadku utraty "
        "zdolnosci do pracy, a takze utraty zywiciela i w innych przypadkach przewidzianych "
        "ustawa.\n"
        "Emerytury, zasilki i inne formy pomocy spolecznej nie moga byc nizsze niz oficjalnie "
        "ustalona granica minimum egzystencji."))
    s.append(art(38, "Kazdy ma prawo do fachowej opieki medycznej."))
    s.append(art(39,
        "Kazdy ma prawo do nauki.\n"
        "Panstwo gwarantuje bezplatne uzyskanie wyksztalcenia ogolnego. Szkolnictwo "
        "znajduje sie pod nadzorem panstwa."))
    s.append(art(40,
        "Kazdemu gwarantuje sie wolnosc tworczosci naukowej i technicznej oraz prawo do "
        "korzystania z dorobku kultury.\n"
        "Panstwo dba o rozwoj kulturalny, naukowy i techniczny spoleczenstwa."))

    s.append(chapter("ROZDZIAL X\nGWARANCJE PRAW I WOLNOSCI CZLOWIEKA"))
    s.append(art(41,
        "Panstwo zapewnia prawa i wolnosci obywateli, zapisane w Konstytucji i ustawach."))
    s.append(art(42,
        "Kazdemu gwarantuje sie ochrone sadowa jego praw i wolnosci, prawo do zaskarzelnia "
        "do sadu niezgodnych z prawem dzialan organow panstwowych, urzednikow oraz "
        "organizacji spolecznych."))
    s.append(art(43,
        "Prawa nieletnich, osob niepelnosprawnych oraz samotnych osob starszych znajduja "
        "sie pod ochrona panstwa."))
    s.append(art(44, "Kobiety i mezczyzni maja rowne prawa."))

    s.append(chapter("ROZDZIAL XI\nOBOWIAZKI OBYWATELI"))
    s.append(art(45, "Wszyscy obywatele poniosza obowiazki nalozone na nich w Konstytucji."))
    s.append(art(46,
        "Obywatele sa zobowiazani do przestrzegania Konstytucji i ustaw, poszanowania "
        "praw, wolnosci, czci i godnosci innych ludzi."))
    s.append(art(47,
        "Obywatele sa zobowiazani do ochrony historycznego, duchowego i kulturowego "
        "dziedzictwa narodu Karakalpakstanu.\n"
        "Zabytki kultury podlegaja ochronie panstwa."))
    s.append(art(48, "Obywatele sa zobowiazani do dbalosc o srodowisko naturalne."))
    s.append(art(49,
        "Obywatele sa zobowiazani do placenia okreslonych ustawa podatkow oraz oplat "
        "lokalnych."))
    s.append(art(50,
        "Obrona Republiki Uzbekistanu oraz Republiki Karakalpakstanu jest obowiazkiem "
        "kazdego obywatela Republiki Karakalpakstanu.\n"
        "Obywatele sa zobowiazani do odbycia sluzby wojskowej lub alternatywnej w trybie "
        "okreslonym ustawa."))

    # CZESC TRZECIA
    s.append(PageBreak())
    s.append(section("CZESC TRZECIA\nSPOLECZENSTWO I JEDNOSTKA"))
    s.append(hr_blue())

    s.append(chapter("ROZDZIAL XII\nEKONOMICZNE PODSTAWY SPOLECZENSTWA"))
    s.append(art(51,
        "Podstawe gospodarki Karakalpakstanu, ukierunkowanej na rozwoj stosunkow rynkowych, "
        "stanowi wlasnosc w jej roznych formach. Panstwo, uwzgledniajac priorytet praw "
        "konsumenta, gwarantuje wolnosc dzialalnosci gospodarczej, przedsiebiorczosci i "
        "pracy, a takze rownouprawnienie i ochrone prawna wszystkich form wlasnosci.\n"
        "Wlasnosc prywatna, obok innych form wlasnosci, jest nienaruszalna i chroniona "
        "przez panstwo. Wlasciciel moze zostac jej pozbawiony jedynie w przypadkach i w "
        "trybie przewidzianym ustawa."))
    s.append(art(52,
        "Wlasciciel wedlug wlasnego uznania posiada, uzytkuje i rozporzadza nalezacym do "
        "niego majatkiem. Korzystanie z majatku nie powinno wyrzadzac szkody srodowisku "
        "ekologicznemu, naruszac praw oraz chronionych ustawa interesow obywateli, osob "
        "prawnych i panstwa."))
    s.append(art(53,
        "Ziemia, jej zasoby, wody, swiat roslinny i zwierzat oraz inne zasoby naturalne "
        "stanowia bogactwo ogolnonarodowe, podlegaja racjonalnemu wykorzystaniu i sa "
        "chronione przez panstwo."))

    s.append(chapter("ROZDZIAL XIII\nORGANIZACJE SPOLECZNE"))
    s.append(art(54,
        "Organizacjami spolecznymi w Republice Karakalpakstanu sa zwiazki zawodowe, "
        "partie polityczne, stowarzyszenia naukowcow, organizacje kobiece, organizacje "
        "weteranow i mlodziezy, zwiazki tworcze, ruchy masowe oraz inne zrzeszenia "
        "obywateli zarejestrowane w trybie okreslonym ustawa."))
    s.append(art(55,
        "Zabrania sie tworzenia i dzialalnosci partii politycznych oraz innych organizacji "
        "spolecznych, ktorych celem jest gwaltowna zmiana ustroju konstytucyjnego, "
        "wystepowanie przeciwko suwerennosci, integralnosci i bezpieczenstwu Republiki, "
        "przeciwko konstytucyjnym prawom i wolnosciom jej obywateli, propagowanie "
        "nienawiski spolecznej, narodowej, rasowej lub religijnej, a takze naruszanie "
        "zdrowia i moralnosci narodu, jak rowniez tworzenia organizacji paramilitarnych "
        "oraz partii politycznych o charakterze narodowym lub religijnym.\n"
        "Zabrania sie tworzenia tajnych stowarzyszen i organizacji."))
    s.append(art(56,
        "Panstwo zapewnia przestrzeganie praw i prawnie chronionych interesow organizacji "
        "spolecznych oraz stwarza im rowne mozliwosci prawne uczestnictwa w zyciu "
        "publicznym.\n"
        "Niedopuszczalna jest ingerencja organizacji spolecznych w dzialalnosc organow "
        "panstwowych i urzednikow, jak rowniez ingerencja organow panstwowych i "
        "urzednikow w dzialalnosc organizacji spolecznych."))
    s.append(art(57,
        "Zwiazki zawodowe wyrazaja i chronia spoleczno-ekonomiczne prawa i interesy "
        "pracownikow. Czlonkostwo w organizacjach zawodowych jest dobrowolne."))
    s.append(art(58,
        "Partie polityczne wyrazaja wole polityczna roznych warstw i grup spolecznych i "
        "poprzez swoich demokratycznie wybranych przedstawicieli uczestnicza w ksztaltowaniu "
        "wladzy panstwowej. Partie polityczne sa zobowiazane do przedstawiania Jokargy "
        "Kenesowi lub upowazionemu przez niego organowi publicznych sprawozdan o zrodlach "
        "finansowania swojej dzialalnosci."))
    s.append(art(59,
        "Organizacje i wspolnoty religijne sa oddzielone od panstwa i rowne wobec prawa. "
        "Panstwo nie ingeruje w dzialalnosc wspolnot religijnych."))
    s.append(art(60,
        "Rozwiazanie, zakaz lub ograniczenie dzialalnosci organizacji spolecznych moze "
        "nastapic wylacznie na podstawie decyzji sadu."))

    s.append(chapter("ROZDZIAL XIV\nRODZINA"))
    s.append(art(61,
        "Rodzina jest podstawowa komorka spoleczenstwa i ma prawo do ochrony ze strony "
        "spoleczenstwa i panstwa.\n"
        "Malzenstwo opiera sie na dobrowolnej zgodzie i rownosci stron."))
    s.append(art(62,
        "Rodzice sa zobowiazani utrzymywac i wychowywac dzieci do osiagniecia przez nie "
        "pelnoletnosci.\n"
        "Panstwo i spoleczenstwo zapewniaja utrzymanie, wychowanie i edukacje dzieci "
        "sierot oraz dzieci pozbawionych opieki rodzicielskiej, a takze wspieraja "
        "dzialalnosc charytatywna na ich rzecz."))
    s.append(art(63,
        "Dzieci sa rowne wobec prawa niezaleznie od pochodzenia i stanu cywilnego "
        "rodzicow.\n"
        "Macierzynstwo i dziecinstwo znajduja sie pod ochrona panstwa."))
    s.append(art(64,
        "Pelnolenie, zdolne do pracy dzieci sa zobowiazane troszczyc sie o swoich "
        "rodzicow."))

    s.append(chapter("ROZDZIAL XV\nSRODKI MASOWEGO PRZEKAZU"))
    s.append(art(65,
        "Srodki masowego przekazu sa wolne i dzialaja zgodnie z ustawa. Poniosza "
        "odpowiedzialnosc za rzetelnosc przekazywanych informacji w trybie okreslonym "
        "prawem.\n"
        "Cenzura jest niedopuszczalna."))

    # CZESC CZWARTA
    s.append(PageBreak())
    s.append(section("CZESC CZWARTA\nPODZIAL TERYTORIALNO-ADMINISTRACYJNY\nREPUBLIKI KARAKALPAKSTANU"))
    s.append(hr_blue())

    s.append(chapter("ROZDZIAL XVI\nPODZIAL TERYTORIALNO-ADMINISTRACYJNY\nREPUBLIKI KARAKALPAKSTANU"))
    s.append(art(66,
        "Republika Karakalpakstanu sklada sie z rejonow, miast, osiedli i auli."))
    s.append(art(67,
        "Tworzenie i likwidacja rejonow i miast, a takze zmiana ich granic, nalezy do "
        "kompetencji Jokargy Kenesu Republiki Karakalpakstanu."))

    # CZESC PIATA
    s.append(PageBreak())
    s.append(section("CZESC PIATA\nORGANIZACJA WLADZY PANSTWOWEJ"))
    s.append(hr_blue())

    s.append(chapter("ROZDZIAL XVII\nJOKARGY KENES REPUBLIKI KARAKALPAKSTANU"))
    s.append(art(68,
        "Jokargy Kenes Republiki Karakalpakstanu, sprawujacy wladze ustawodawcza, jest "
        "najwyzszym panstwowym organem przedstawicielskim."))
    s.append(art(69,
        "Jokargy Kenes Republiki Karakalpakstanu sklada sie z deputowanych wybieranych "
        "w okregach terytorialnych na zasadzie wielopartyjnosci na okres 5 lat.\n"
        "Prawo bycia wybranym do Jokargy Kenesu Republiki Karakalpakstanu przysluguje "
        "obywatelom Republiki Karakalpakstanu, ktorzy w dniu wyborow ukonczyli 25 lat.\n"
        "Wymogi stawiane kandydatom na deputowanych okresla ustawa."))
    s.append(art(70,
        "Do wylacznych kompetencji Jokargy Kenesu Republiki Karakalpakstanu nalezy:\n"
        "1) uchwalanie Konstytucji Republiki Karakalpakstanu oraz wprowadzanie do niej "
        "zmian i uzupelnien;\n"
        "2) uchwalanie ustaw Republiki Karakalpakstanu, wprowadzanie do nich zmian i "
        "uzupelnien oraz ich interpretacja;\n"
        "3) uchwalanie panstwowych programow strategicznych rozwoju gospodarczego i "
        "spolecznego;\n"
        "4) wybor Przewodniczacego Jokargy Kenesu Republiki Karakalpakstanu i jego "
        "zastepcy;\n"
        "5) tworzenie Prezydium Jokargy Kenesu Republiki Karakalpakstanu;\n"
        "6) powolywanie i odwolywanie Przewodniczacego Rady Ministrow Republiki "
        "Karakalpakstanu na wniosek Przewodniczacego Jokargy Kenesu Republiki "
        "Karakalpakstanu i za zgoda Prezydenta Republiki Uzbekistanu;\n"
        "7) powolywanie i odwolywanie zastepcy Przewodniczacego Rady Ministrow oraz "
        "czlonkow Rady Ministrow Republiki Karakalpakstanu, tworzenie i likwidacja "
        "ministerstw, komitetow panstwowych i innych organow administracji panstwowej "
        "Republiki Karakalpakstanu;\n"
        "8) wybor Komitetu Nadzoru Konstytucyjnego Republiki Karakalpakstanu, Sadu "
        "Najwyzszego Republiki Karakalpakstanu ds. cywilnych, Sadu Najwyzszego Republiki "
        "Karakalpakstanu ds. karnych, Sadu Gospodarczego Republiki Karakalpakstanu;\n"
        "9) powolywanie i odwolywanie sedziow sadow miedzyrejonowych, rejonowych i "
        "miejskich ds. cywilnych i karnych;\n"
        "10) powolywanie i odwolywanie Prokuratora Republiki Karakalpakstanu na wniosek "
        "Prezydium Jokargy Kenesu za zgoda Prokuratora Generalnego Republiki Uzbekistanu;\n"
        "11) powolywanie i odwolywanie Przewodniczacego Panstwowego Komitetu Republiki "
        "Karakalpakstanu ds. Ochrony Przyrody;\n"
        "12) zawieszanie i uchylanie decyzji lokalnych Rad Deputowanych Ludowych;\n"
        "13) ustawowe regulowanie kwestii podzialu terytorialno-administracyjnego;\n"
        "14) okreslanie systemu i kompetencji republikanskich i lokalnych organow wladzy "
        "panstwowej;\n"
        "15) zatwierdzanie budzetu panstwowego Republiki Karakalpakstanu i sprawozdan z "
        "jego wykonania na wniosek Rady Ministrow Republiki Karakalpakstanu;\n"
        "16) ustanawianie panstwowych odznaczen i tytutow honorowych Republiki "
        "Karakalpakstanu;\n"
        "17) wyznaczanie wyborow do Jokargy Kenesu Republiki Karakalpakstanu i lokalnych "
        "organow przedstawicielskich; tworzenie Centralnej Komisji Wyborczej;\n"
        "18) kierowanie do Sadu Konstytucyjnego Republiki Uzbekistanu wnioskow dotyczacych "
        "zgodnosci aktow najwyzszych organow wladzy panstwowej i administracji Republiki "
        "Uzbekistanu z Konstytucja Republiki Uzbekistanu;\n"
        "19) wykonywanie innych uprawnien przewidzianych niniejsza Konstytucja."))
    s.append(art(71,
        "Dzialalnosc Jokargy Kenesu Republiki Karakalpakstanu odbywa sie w trybie "
        "okreslonym Konstytucja Republiki Karakalpakstanu i Regulaminem Jokargy Kenesu."))
    s.append(art(72,
        "Posiedzenie Jokargy Kenesu Republiki Karakalpakstanu jest prawomocne, jezeli "
        "uczestniczy w nim co najmniej dwie trzecie ogolnej liczby deputowanych."))
    s.append(art(73,
        "W posiedzeniach Jokargy Kenesu Republiki Karakalpakstanu i jego organow moga "
        "uczestniczyc: Przewodniczacy Rady Ministrow Republiki Karakalpakstanu i jego "
        "zastepcy, ministrowie, przewodniczacy komitetow panstwowych, kierownicy innych "
        "organow administracji panstwowej, Przewodniczacy Komitetu Nadzoru "
        "Konstytucyjnego Republiki Karakalpakstanu, Przewodniczacy Sadu Najwyzszego "
        "Republiki Karakalpakstanu ds. cywilnych, Przewodniczacy Sadu Najwyzszego "
        "Republiki Karakalpakstanu ds. karnych, Przewodniczacy Sadu Gospodarczego "
        "Republiki Karakalpakstanu oraz Prokurator Republiki Karakalpakstanu."))
    s.append(art(74,
        "Po uplywie kadencji Jokargy Kenes Republiki Karakalpakstanu kontynuuje swoja "
        "dzialalnosc az do rozpoczecia pracy przez Jokargy Kenes nowej kadencji.\n"
        "Pierwsze po wyborach posiedzenie Jokargy Kenesu Republiki Karakalpakstanu "
        "zwolyane jest przez Centralna Komisje Wyborcza nie pozniej niz dwa miesiace "
        "po wyborach."))
    s.append(art(75,
        "Prawo inicjatywy ustawodawczej w Jokargy Kenesie Republiki Karakalpakstanu "
        "przysluguje deputowanym Jokargy Kenesu, Radzie Ministrow Republiki "
        "Karakalpakstanu, Komitetowi Nadzoru Konstytucyjnego Republiki Karakalpakstanu, "
        "Sadowi Najwyzszemu Republiki Karakalpakstanu ds. cywilnych, Sadowi Najwyzszemu "
        "Republiki Karakalpakstanu ds. karnych, Sadowi Gospodarczemu Republiki "
        "Karakalpakstanu oraz Prokuratorowi Republiki Karakalpakstanu."))
    s.append(art(76,
        "Jokargy Kenes Republiki Karakalpakstanu uchwala ustawy, uchwaly i inne akty. "
        "Do przyjecia ustawy wymagana jest wiekszosc glosow wszystkich deputowanych "
        "Jokargy Kenesu Republiki Karakalpakstanu.\n"
        "Publikacja ustaw Republiki Karakalpakstanu i innych aktow normatywnych Jokargy "
        "Kenesu w prasie jest obowiazkownym warunkiem ich stosowania."))
    s.append(art(77,
        "Jokargy Kenes Republiki Karakalpakstanu wybiera sposrod deputowanych komitety "
        "i komisje do prowadzenia prac legislacyjnych, wstepnego rozpatrywania i "
        "przygotowywania spraw kierowanych pod obrady Jokargy Kenesu oraz do kontroli "
        "wykonania ustaw i innych decyzji Jokargy Kenesu.\n"
        "Jokargy Kenes Republiki Karakalpakstanu moze w razie potrzeby tworzyc stale lub "
        "tymczasowe komisje deputackie, rewizyjne i inne.\n"
        "Kompetencje oraz tryb dzialalnosci komitetow i komisji Jokargy Kenesu Republiki "
        "Karakalpakstanu okresla ustawa."))
    s.append(art(78,
        "Koszty zwiazane z dzialalnoscia parlamentarna deputowanych Jokargy Kenesu "
        "Republiki Karakalpakstanu sa zwracane w okreslonym trybie.\n"
        "Deputowani pracujacy w Jokargy Kenesie i jego organach na zasadzie stalej nie "
        "moga w okresie pelnieniamanatu zajmowac zadnego innego platnego stanowiska ani "
        "prowadzic dzialalnosci gospodarczej."))
    s.append(art(79,
        "Deputowany Jokargy Kenesu Republiki Karakalpakstanu korzysta z immunitetu. "
        "Nie moze on zostac pociagniety do odpowiedzialnosci karnej, aresztowany ani "
        "poddany administracyjnym srodkom przymusu stosowanym w trybie sadowym bez "
        "zgody Jokargy Kenesu Republiki Karakalpakstanu."))

    s.append(chapter("ROZDZIAL XVIII\nPRZEWODNICZACY JOKARGY KENESU\nREPUBLIKI KARAKALPAKSTANU"))
    s.append(art(80,
        "Przewodniczacy Jokargy Kenesu Republiki Karakalpakstanu jest najwyzszym "
        "urzednikiem Republiki Karakalpakstanu.\n"
        "Przewodniczacy Jokargy Kenesu Republiki Karakalpakstanu jest wybierany przez "
        "Jokargy Kenes Republiki Karakalpakstanu sposrod deputowanych w glosowaniu "
        "tajnym na okres kadencji Jokargy Kenesu Republiki Karakalpakstanu, na nie "
        "wiecej niz dwie kolejne kadencje."))
    s.append(art(81,
        "Przewodniczacy Jokargy Kenesu Republiki Karakalpakstanu:\n"
        "1) zapewnia wspoldzialanie najwyzszych organow wladzy ustawodawczej i wykonawczej "
        "Republiki Karakalpakstanu;\n"
        "2) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu sprawozdania o sytuacji "
        "w republice oraz w innych waznych kwestiach;\n"
        "3) organizuje wdrazanie ustaw Republiki Uzbekistanu i innych decyzji Oliy Majlisu, "
        "dekretow i innych aktow Prezydenta Republiki Uzbekistanu; organizuje kontrole nad "
        "wykonaniem ustaw Republiki Karakalpakstanu i uchwal Jokargy Kenesu;\n"
        "4) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu kandydatury na "
        "stanowiska zastepcy Przewodniczacego Jokargy Kenesu oraz przewodniczacych "
        "komitetow i komisji Jokargy Kenesu Republiki Karakalpakstanu;\n"
        "5) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu za zgoda Prezydenta "
        "Republiki Uzbekistanu kandydature na stanowisko Przewodniczacego Rady Ministrow "
        "Republiki Karakalpakstanu;\n"
        "6) mianuje i odwoluje hakimow rejonow i miast na wniosek Przewodniczacego Rady "
        "Ministrow Republiki Karakalpakstanu, z pozniejszym zatwierdzeniem przez wlasciwe "
        "Rady Deputowanych Ludowych;\n"
        "7) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu za zgoda Prezydium "
        "Jokargy Kenesu kandydatury na stanowiska Przewodniczacego i czlonkow Komitetu "
        "Nadzoru Konstytucyjnego Republiki Karakalpakstanu;\n"
        "8) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu za zgoda Prezydenta "
        "Republiki Uzbekistanu kandydatury na stanowiska Przewodniczacego i sedziow Sadu "
        "Najwyzszego Republiki Karakalpakstanu ds. cywilnych, Przewodniczacego i sedziow "
        "Sadu Najwyzszego Republiki Karakalpakstanu ds. karnych, Przewodniczacego i "
        "sedziow Sadu Gospodarczego Republiki Karakalpakstanu, a takze sedziow sadow "
        "miedzyrejonowych, rejonowych i miejskich ds. cywilnych i karnych;\n"
        "9) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu za zgoda Prezydium "
        "Jokargy Kenesu kandydature na stanowisko Przewodniczacego Panstwowego Komitetu "
        "Republiki Karakalpakstanu ds. Ochrony Przyrody;\n"
        "10) sprawuje ogolne kierownictwo przygotowaniem spraw kierowanych pod obrady "
        "Jokargy Kenesu; zwoluje posiedzenia Jokargy Kenesu i wspolnie z "
        "przewodniczacymi komitetow i komisji uklada projekt porzeadku obrad;\n"
        "11) organizuje prace Jokargy Kenesu i jego Prezydium, przewodniczy ich "
        "posiedzeniom, podpisuje ustawy Republiki Karakalpakstanu i inne akty przyjete "
        "przez Jokargy Kenes i jego Prezydium, kieruje i koordynuje prace komitetow "
        "i komisji Jokargy Kenesu Republiki Karakalpakstanu;\n"
        "12) przedstawia kandydatury do odznaczenan panstwowych i nadania tytutow "
        "honorowych Republiki Karakalpakstanu;\n"
        "13) inicjuje sprawy o ułaskawienie skazanych obywateli;\n"
        "14) organizuje publiczne konsultacje projektow ustaw i innych waznych kwestii "
        "zycia panstwowego;\n"
        "15) wykonuje inne uprawnienia przewidziane obowiazujacymi przepisami prawa.\n"
        "Przewodniczacy Jokargy Kenesu Republiki Karakalpakstanu ma prawo kierowac "
        "sprawy nalezace do jego kompetencji pod obrady Prezydium Jokargy Kenesu "
        "Republiki Karakalpakstanu."))
    s.append(art(82,
        "Przewodniczacy Jokargy Kenesu Republiki Karakalpakstanu wydaje zarzadzenia w "
        "sprawach nalezacych do jego kompetencji."))
    s.append(art(83,
        "Przewodniczacy Jokargy Kenesu Republiki Karakalpakstanu moze zostac odwolany "
        "przez Jokargy Kenes w przypadku naruszenia Konstytucji i ustaw Republiki "
        "Karakalpakstanu. Decyzja o odwolaniu podejmowana jest wiekszoscia co najmniej "
        "dwoch trzecich ogolnej liczby deputowanych Jokargy Kenesu, z inicjatywy jednej "
        "trzeciej deputowanych, z uwzglednieniem opinii Komitetu Nadzoru Konstytucyjnego "
        "Republiki Karakalpakstanu.\n"
        "Przewodniczacy Jokargy Kenesu moze zakonczyc swoje uprawnienia na wlasny "
        "wniosek, a takze w przypadku niemoznosci wykonywania obowiazkow z powodu stanu "
        "zdrowia potwierdzonego opinia Panstwowej Komisji Medycznej powolane przez "
        "Jokargy Kenes Republiki Karakalpakstanu. Decyzja o zakonczeniu uprawnien "
        "Przewodniczacego Jokargy Kenesu Republiki Karakalpakstanu podejmowana jest "
        "wiekszoscia glosow ogolnej liczby deputowanych Jokargy Kenesu Republiki "
        "Karakalpakstanu.\n"
        "W takich przypadkach wybory nowego Przewodniczacego Jokargy Kenesu Republiki "
        "Karakalpakstanu przeprowadza sie w ciagu 10 dni."))

    s.append(chapter("ROZDZIAL XIX\nPREZYDIUM JOKARGY KENESU\nREPUBLIKI KARAKALPAKSTANU"))
    s.append(art(84,
        "W celu organizacji pracy Jokargy Kenesu Republiki Karakalpakstanu oraz "
        "wykonywania innych uprawnien tworzone jest Prezydium Jokargy Kenesu Republiki "
        "Karakalpakstanu.\n"
        "W sklad Prezydium Jokargy Kenesu Republiki Karakalpakstanu wchodza: "
        "Przewodniczacy Jokargy Kenesu, jego zastepca, przewodniczacy komitetow i "
        "komisji Jokargy Kenesu oraz liderzy grup partyjnych w Jokargy Kenesie Republiki "
        "Karakalpakstanu."))
    s.append(art(85,
        "Prezydium Jokargy Kenesu Republiki Karakalpakstanu:\n"
        "1) przygotowuje propozycje dotyczace porzadku obrad i trybu pracy sesji Jokargy "
        "Kenesu;\n"
        "2) wysluchuje sprawozdan komitetow i komisji Jokargy Kenesu o prowadzonej pracy "
        "oraz informacji o wykonaniu ustaw Republiki Karakalpakstanu i decyzji Jokargy "
        "Kenesu;\n"
        "3) organizuje planowanie prac legislacyjnych;\n"
        "4) na wniosek Przewodniczacego Jokargy Kenesu wstepnie rozpatruje projekty ustaw "
        "i inne dokumenty;\n"
        "5) analizuje propozycje i uwagi deputowanych zgloszone na sesji Jokargy Kenesu i "
        "podejmuje odpowiednie decyzje;\n"
        "6) przyznaje odznaczenia panstwowe Republiki Karakalpakstanu i nadaje honorowe "
        "tytuly Republiki Karakalpakstanu;\n"
        "7) w okresie miedzy sesjami Jokargy Kenesu, na wniosek Przewodniczacego Rady "
        "Ministrow Republiki Karakalpakstanu, powoluje i odwoluje zastepcy "
        "Przewodniczacego Rady Ministrow i czlonkow Rady Ministrow Republiki "
        "Karakalpakstanu, tworzy i likwiduje ministerstwa, komitety panstwowe i inne "
        "organy administracji panstwowej Republiki Karakalpakstanu, a nastepnie "
        "przedstawia odpowiednie uchwaly do zatwierdzenia przez Jokargy Kenes Republiki "
        "Karakalpakstanu;\n"
        "8) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu za zgoda Prokuratora "
        "Generalnego Republiki Uzbekistanu kandydature na stanowisko Prokuratora Republiki "
        "Karakalpakstanu;\n"
        "9) w okresie miedzy sesjami wyraza zgode na pociagniecie deputowanego Jokargy "
        "Kenesu do odpowiedzialnosci w przypadkach i trybie okreslonych ustawa, a takze "
        "na rozwiazanie z nim umowy o prace z inicjatywy pracodawcy;\n"
        "10) rozpatruje inne kwestie zwiazane z praca Jokargy Kenesu i skutecznym "
        "wykonywaniem obowiazkow przez deputowanych.\n"
        "Prezydium Jokargy Kenesu Republiki Karakalpakstanu wydaje uchwaly w sprawach "
        "nalezacych do jego kompetencji, ktore sa publikowane w trybie przewidzianym "
        "prawem."))

    s.append(chapter("ROZDZIAL XX\nRADA MINISTROW REPUBLIKI KARAKALPAKSTANU"))
    s.append(art(86,
        "Rada Ministrow Republiki Karakalpakstanu — Rzad Republiki Karakalpakstanu — jest "
        "najwyzszym organem wladzy wykonawczo-administracyjnej Republiki Karakalpakstanu."))
    s.append(art(87,
        "Rada Ministrow Republiki Karakalpakstanu jest powolywan przez Jokargy Kenes "
        "Republiki Karakalpakstanu. Rada Ministrow Republiki Karakalpakstanu kieruje "
        "efektywnym funkcjonowaniem gospodarki oraz sfery spolecznej i duchowej; zapewnia "
        "wykonanie ustaw Republiki Uzbekistanu i innych decyzji Oliy Majlisu Republiki "
        "Uzbekistanu, dekretow, uchwal i zarzadzen Prezydenta Republiki Uzbekistanu, "
        "uchwal i zarzadzen Gabinetu Ministrow Republiki Uzbekistanu, ustaw Republiki "
        "Karakalpakstanu i innych decyzji Jokargy Kenesu Republiki Karakalpakstanu oraz "
        "uchwal Prezydium Jokargy Kenesu Republiki Karakalpakstanu.\n"
        "Rada Ministrow Republiki Karakalpakstanu zawiesza i uchyla akty organow "
        "administracji panstwowej Republiki Karakalpakstanu, a takze akty hakimow "
        "rejonow i miast."))
    s.append(art(88,
        "Rada Ministrow Republiki Karakalpakstanu jest kierowana przez Przewodniczacego, "
        "powolywanego przez Jokargy Kenes na wniosek Przewodniczacego Jokargy Kenesu "
        "Republiki Karakalpakstanu i za zgoda Prezydenta Republiki Uzbekistanu.\n"
        "Przewodniczacy Rady Ministrow Republiki Karakalpakstanu z urzedu wchodzi w sklad "
        "Gabinetu Ministrow Republiki Uzbekistanu.\n"
        "Przewodniczacy Rady Ministrow Republiki Karakalpakstanu:\n"
        "1) kieruje dzialalnoscia rzadu i podejmuje dzialania zapewniajace skuteczne "
        "wykonywanie jego uprawnien;\n"
        "2) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, a w okresie miedzy "
        "sesjami Prezydium Jokargy Kenesu Republiki Karakalpakstanu, kandydatury do "
        "powolania i odwolania zastepcy Przewodniczacego Rady Ministrow i czlonkow Rady "
        "Ministrow Republiki Karakalpakstanu;\n"
        "3) rozdziela obowiazki miedzy zastepcy Przewodniczacego Rady Ministrow, a "
        "nastepnie przedstawia je do zatwierdzenia Prezydium Rady Ministrow;\n"
        "4) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, a w okresie miedzy "
        "sesjami Prezydium Jokargy Kenesu Republiki Karakalpakstanu, propozycje "
        "dotyczace tworzenia i likwidacji ministerstw, komitetow panstwowych i innych "
        "organow administracji panstwowej Republiki Karakalpakstanu;\n"
        "5) przedstawia Przewodniczacemu Jokargy Kenesu Republiki Karakalpakstanu "
        "kandydatury do powolania i odwolania hakimow rejonow i miast;\n"
        "6) przewodniczy posiedzeniom Rady Ministrow i jej Prezydium;\n"
        "7) zapewnia kolegialnosc pracy Rady Ministrow;\n"
        "8) podejmuje decyzje w sprawach panstwowych i gospodarczych, ktore nie wymagaja "
        "rozpatrzenia na posiedzeniu Rady Ministrow lub jej Prezydium;\n"
        "9) wykonuje inne uprawnienia ustanowione prawem w granicach swojej kompetencji."))
    s.append(art(89,
        "Rada Ministrow Republiki Karakalpakstanu jest odpowiedzialna i podlega "
        "sprawozdawczosci przed Jokargy Kenesem Republiki Karakalpakstanu.\n"
        "Rada Ministrow Republiki Karakalpakstanu sklada sprawozdanie ze swojej "
        "dzialalnosci przed Jokargy Kenesem co najmniej raz w roku.\n"
        "Rada Ministrow Republiki Karakalpakstanu sklada swoje uprawnienia przed nowo "
        "wybranym Jokargy Kenesem Republiki Karakalpakstanu."))
    s.append(art(90,
        "Rada Ministrow Republiki Karakalpakstanu, na podstawie i w wykonaniu ustaw "
        "Republiki Uzbekistanu i innych decyzji Oliy Majlisu Republiki Uzbekistanu, "
        "dekretow, uchwal i zarzadzen Prezydenta Republiki Uzbekistanu, uchwal i "
        "zarzadzen Gabinetu Ministrow Republiki Uzbekistanu, ustaw Republiki "
        "Karakalpakstanu i innych decyzji Jokargy Kenesu Republiki Karakalpakstanu oraz "
        "uchwal Prezydium Jokargy Kenesu Republiki Karakalpakstanu, wydaje uchwaly i "
        "zarzadzenia obowiazujace na calym terytorium Republiki Karakalpakstanu."))
    s.append(art(91,
        "Kompetencje Rady Ministrow Republiki Karakalpakstanu, tryb jej dzialalnosci "
        "oraz relacje Rady Ministrow z innymi organami panstwowymi Republiki "
        "Karakalpakstanu okresla ustawa Republiki Karakalpakstanu."))

    s.append(chapter("ROZDZIAL XXI\nPODSTAWY WLADZY PANSTWOWEJ NA POZIOMIE LOKALNYM"))
    s.append(art(92,
        "Organami przedstawicielskimi w rejonach i miastach (z wyjatkiem miast "
        "podporzadkowanych rejonowi) sa Rady Deputowanych Ludowych, na czele ktorych "
        "stoja hakimowie. Dzialaja one w interesie panstwa i obywateli, rozwiazujac "
        "kwestie nalezace do ich kompetencji."))
    s.append(art(93,
        "Do kompetencji lokalnych organow wladzy naleza:\n"
        "— zapewnienie legalnosci, porzadku publicznego i bezpieczenstwa obywateli;\n"
        "— kwestie rozwoju gospodarczego, spolecznego i kulturalnego terytoriow;\n"
        "— tworzenie i wykonywanie lokalnego budzetu, ustalanie lokalnych podatkow i "
        "oplat, tworzenie funduszy pozabudzetowych;\n"
        "— zarzadzanie lokalna gospodarka komunalna;\n"
        "— ochrona srodowiska oraz rejestracja aktow stanu cywilnego;\n"
        "— przyjmowanie aktow normatywnych nie sprzecznych z Konstytucja i ustawami "
        "Republiki Karakalpakstanu oraz wykonywanie innych uprawnien."))
    s.append(art(94,
        "Lokalne organy wladzy realizuja ustawy Republiki Uzbekistanu, inne decyzje Oliy "
        "Majlisu Republiki Uzbekistanu, dekrety, uchwaly i zarzadzenia Prezydenta "
        "Republiki Uzbekistanu, uchwaly i zarzadzenia Gabinetu Ministrow Republiki "
        "Uzbekistanu, ustawy Republiki Karakalpakstanu i inne decyzje Jokargy Kenesu "
        "Republiki Karakalpakstanu, uchwaly Prezydium Jokargy Kenesu Republiki "
        "Karakalpakstanu, uchwaly i zarzadzenia Rady Ministrow Republiki Karakalpakstanu, "
        "a takze uczestnicza w omawianiu kwestii o znaczeniu republikanskim i lokalnym.\n"
        "Decyzje organow wyzszego szczebla podjete w granicach ich kompetencji sa "
        "obowiazujace dla organow nizszego szczebla.\n"
        "Kadencja Rad Deputowanych Ludowych i hakimow wynosi 5 lat."))
    s.append(art(95,
        "Na danym terytorium hakim rejonu lub miasta stoi na czele wladzy "
        "przedstawicielskiej i wykonawczej."))
    s.append(art(96,
        "Hakimowie rejonow i miast sa powolywani i odwolywani przez Przewodniczacego "
        "Jokargy Kenesu Republiki Karakalpakstanu na wniosek Przewodniczacego Rady "
        "Ministrow Republiki Karakalpakstanu i zatwierdzani przez wlasciwe Rady "
        "Deputowanych Ludowych.\n"
        "Hakimowie miast podporzadkowanych rejonowi sa powolywani i odwolywani przez "
        "hakima rejonu i zatwierdzani przez rejonowa Rade Deputowanych Ludowych."))
    s.append(art(97,
        "Hakim rejonu lub miasta wykonuje swoje uprawnienia na zasadzie jednoosobowego "
        "kierownictwa i ponosi osobista odpowiedzialnosc za decyzje i dzialania "
        "kierowanych przez siebie organow.\n"
        "Organizacja dzialalnosci hakimow i lokalnych Rad Deputowanych Ludowych, zakres "
        "ich uprawnien oraz tryb wyborow lokalnych Rad Deputowanych Ludowych reguluje "
        "ustawa."))
    s.append(art(98,
        "Hakim, w granicach przyslugujacych mu uprawnien, wydaje decyzje obowiazujace "
        "wszystkie przedsiebiorstwa, instytucje, organizacje, stowarzyszenia, a takze "
        "urzednikow i obywateli na danym terytorium."))
    s.append(art(99,
        "Organami samorzadu w osiedlach, aulach oraz mahallach miast sa zgromadzenia "
        "obywateli, ktore wybieraja na 2,5 roku przewodniczacego (aksakala) i jego "
        "doradcow.\n"
        "Tryb wyborow, organizacja dzialalnosci i zakres uprawnien organow samorzadu "
        "reguluje ustawa."))

    s.append(chapter("ROZDZIAL XXII\nWLADZA SADOWNICZA REPUBLIKI KARAKALPAKSTANU"))
    s.append(art(100,
        "Wladza sadownicza w Republice Karakalpakstanu dziala niezaleznie od wladzy "
        "ustawodawczej i wykonawczej, partii politycznych oraz innych organizacji "
        "spolecznych."))
    s.append(art(101,
        "System sadowniczy Republiki Karakalpakstanu sklada sie z wybieranych na "
        "5-letnia kadencje: Sadu Najwyzszego Republiki Karakalpakstanu ds. cywilnych, "
        "Sadu Najwyzszego Republiki Karakalpakstanu ds. karnych, Sadu Gospodarczego "
        "Republiki Karakalpakstanu, a takze powolyswanych na ten sam okres sadow "
        "miedzyrejonowych, rejonowych i miejskich ds. cywilnych i karnych.\n"
        "Organizacja i tryb dzialalnosci sadow sa okreslane ustawa.\n"
        "Tworzenie sadow nadzwyczajnych jest niedopuszczalne."))
    s.append(art(102,
        "Sad Najwyzszy Republiki Karakalpakstanu ds. cywilnych jest najwyzszym organem "
        "wladzy sadowniczej w zakresie postepowania cywilnego i ma prawo sprawowania "
        "nadzoru sadowego nad dzialalnoscia miedzyrejonowych sadow ds. cywilnych."))
    s.append(art(103,
        "Sad Najwyzszy Republiki Karakalpakstanu ds. karnych jest najwyzszym organem "
        "wladzy sadowniczej w zakresie postepowania karnego i administracyjnego i ma "
        "prawo sprawowania nadzoru sadowego nad dzialalnoscia rejonowych i miejskich "
        "sadow ds. karnych."))
    s.append(art(104,
        "Spory gospodarcze powstale w sferze ekonomicznej i w toku zarzadzania nia "
        "miedzy przedsiebiorstwami, instytucjami i organizacjami opartymi na roznych "
        "formach wlasnosci oraz przedsiebiorcami sa rozstrzygane przez Sad Gospodarczy "
        "Republiki Karakalpakstanu w granicach jego kompetencji."))
    s.append(art(105,
        "Sedziowie sa niezalezni i podlegaja jedynie ustawie. Jakakolwiek ingerencja w "
        "dzialalnosc sedziow przy sprawowaniu wymiaru sprawiedliwosci jest "
        "niedopuszczalna i pociaga za soba odpowiedzialnosc przewidziana prawem. "
        "Nietykalnosc sedziow jest gwarantowana ustawa. Sedziowie nie moga byc "
        "senatorami ani deputowanymi organow przedstawicielskich wladzy panstwowej.\n"
        "Sedziowie nie moga byc czlonkami partii politycznych, uczestniczyc w ruchach "
        "politycznych ani zajmowac zadnego innego platnego stanowiska poza dzialalnoscia "
        "naukowa i dydaktyczna.\n"
        "Przed uplywem kadencji sedzia moze zostac odwolany ze stanowiska jedynie na "
        "podstawach okreslonych w ustawie."))
    s.append(art(106,
        "Rozpoznawanie spraw we wszystkich sadach jest jawne. Rozpatrywanie spraw na "
        "posiedzeniu zamknietym dopuszcza sie jedynie w przypadkach przewidzianych "
        "ustawa."))
    s.append(art(107,
        "Akty wladzy sadowniczej sa obowiazujace dla wszystkich organow panstwowych, "
        "organizacji spolecznych, przedsiebiorstw, instytucji, organizacji, urzednikow "
        "oraz obywateli."))
    s.append(art(108,
        "Postepowanie sadowe w Republice Karakalpakstanu prowadzi sie w jezyku "
        "karakalpackim, uzb eckim lub w jezyku wiekszosci ludnosci danej miejscowosci. "
        "Osobom uczestniczacym w postepowaniu, ktore nie znaja jezyka postepowania, "
        "zapewnia sie prawo pelnego zapoznania sie z materialami sprawy, udzialu w "
        "czynnosciach sadowych za posrednictwem tlumacza oraz prawo wystepowania w "
        "sadzie w swoim jezyku ojczystym."))
    s.append(art(109,
        "Oskarzonemu zapewnia sie prawo do obrony. Prawo do profesjonalnej pomocy "
        "prawnej jest gwarantowane na kazdym etapie postepowania.\n"
        "W celu udzielania pomocy prawnej obywatelom, przedsiebiorstwom, organizacjom "
        "i instytucjom dziala adwokatura. Organizacja i tryb dzialalnosci adwokatury "
        "sa okreslane ustawa."))

    s.append(chapter("ROZDZIAL XXIII\nSYSTEM WYBORCZY"))
    s.append(art(110,
        "Obywatele Republiki Karakalpakstanu maja prawo wybierania i bycia wybranym do "
        "organow przedstawicielskich. Kazdy wyborca ma jeden glos. Prawo glosu, "
        "rownosc i swoboda wyrazania woli sa gwarantowane ustawa.\n"
        "Wybory do Jokargy Kenesu Republiki Karakalpakstanu oraz do rejonowych i "
        "miejskich organow przedstawicielskich wladzy panstwowej przeprowadza sie w "
        "roku uplywu ich kadencji konstytucyjnej — w pierwsza niedziele trzeciej dekady "
        "grudnia. Wybory odbywaja sie na podstawie powszechnego, rownego i "
        "bezposredniego prawa wyborczego, w glosowaniu tajnym. Prawo wybierania maja "
        "obywatele Republiki Karakalpakstanu, ktorzy ukonczyli osiemnascie lat.\n"
        "Osoby uznane przez sad za niezdolne do czynnosci prawnych oraz osoby "
        "odbywajace kare pozbawienia wolnosci na podstawie wyroku sadu nie moga byc "
        "wybierane i nie uczestnicza w wyborach. W jakichkolwiek innych przypadkach "
        "bezposrednie lub posrednie ograniczenie praw wyborczych obywateli jest "
        "niedopuszczalne.\n"
        "Obywatel Republiki Karakalpakstanu nie moze jednoczesnie piastowac mandatu "
        "deputowanego w wiecej niz dwoch organach przedstawicielskich.\n"
        "Tryb przeprowadzania wyborow okresla ustawa."))

    s.append(chapter("ROZDZIAL XXIV\nNADZOR KONSTYTUCYJNY"))
    s.append(art(111,
        "Nadzor konstytucyjny w Republice Karakalpakstanu sprawuje Komitet Nadzoru "
        "Konstytucyjnego Republiki Karakalpakstanu. Komitet Nadzoru Konstytucyjnego "
        "jest wybierany przez Jokargy Kenes Republiki Karakalpakstanu sposrod "
        "specjalistow w dziedzinie polityki i prawa, w skladzie: Przewodniczacy Komitetu "
        "Nadzoru Konstytucyjnego, jego zastepca oraz czlonkowie komitetu. Kadencja osob "
        "wybranych do Komitetu Nadzoru Konstytucyjnego trwa piec lat.\n"
        "Pelnienie obowiazkow Przewodniczacego, jego zastepcy i czlonkow Komitetu "
        "Nadzoru Konstytucyjnego jest niepolaczalne z mandatem deputowanego.\n"
        "Osoby wybrane do Komitetu Nadzoru Konstytucyjnego nie moga jednoczesnie "
        "wchodzic w sklad organow, ktorych akty sa poddane nadzorowi Komitetu.\n"
        "Osoby wybrane do Komitetu Nadzoru Konstytucyjnego sa niezawisle w wykonywaniu "
        "swoich obowiazkow i podlegaja wylacznie Konstytucji Republiki Karakalpakstanu."))
    s.append(art(112,
        "Komitet Nadzoru Konstytucyjnego Republiki Karakalpakstanu:\n"
        "1) na zlecenie Jokargy Kenesu Republiki Karakalpakstanu przedklada mu opinie "
        "o zgodnosci ustaw Republiki Karakalpakstanu i innych aktow przedstawianych "
        "Jokargy Kenesowi Republiki Karakalpakstanu z Konstytucja Republiki "
        "Karakalpakstanu;\n"
        "2) na wniosek co najmniej jednej piatej deputowanych Jokargy Kenesu Republiki "
        "Karakalpakstanu lub Przewodniczacego Jokargy Kenesu Republiki Karakalpakstanu "
        "przedklada Jokargy Kenesowi opinie o zgodnosci ustaw i innych aktow przyjętych "
        "przez Jokargy Kenes Republiki Karakalpakstanu z Konstytucja Republiki "
        "Karakalpakstanu;\n"
        "3) na zlecenie Jokargy Kenesu Republiki Karakalpakstanu przedklada mu opinie "
        "o zgodnosci uchwal Prezydium Jokargy Kenesu i zarzadzen Przewodniczacego "
        "Jokargy Kenesu z Konstytucja i ustawami Republiki Karakalpakstanu;\n"
        "4) na zlecenie Jokargy Kenesu Republiki Karakalpakstanu lub na wniosek co "
        "najmniej jednej piatej deputowanych Jokargy Kenesu albo Przewodniczacego "
        "Jokargy Kenesu Republiki Karakalpakstanu przedklada Jokargy Kenesowi opinie "
        "o zgodnosci uchwal i zarzadzen Rady Ministrow Republiki Karakalpakstanu z "
        "Konstytucja i ustawami Republiki Karakalpakstanu.\n"
        "Komitet Nadzoru Konstytucyjnego jest uprawniony rowniez z wlasnej inicjatywy "
        "do przedkladania opinii o zgodnosci aktow najwyzszych organow wladzy panstwowej "
        "i administracji Republiki Karakalpakstanu z Konstytucja i ustawami Republiki "
        "Karakalpakstanu.\n"
        "Opinia Komitetu moze byc uchylona jedynie decyzja Jokargy Kenesu Republiki "
        "Karakalpakstanu przyjeta wiekszoscia dwoch trzecich glosow ogolnej liczby "
        "deputowanych Jokargy Kenesu Republiki Karakalpakstanu.\n"
        "Organizacja i tryb dzialalnosci Komitetu Nadzoru Konstytucyjnego Republiki "
        "Karakalpakstanu sa okreslane Ustawa o Komitecie Nadzoru Konstytucyjnego "
        "Republiki Karakalpakstanu."))

    s.append(chapter("ROZDZIAL XXV\nPROKURATURA"))
    s.append(art(113,
        "Nadzor nad scislym i jednolitym wykonywaniem ustaw na terytorium Republiki "
        "Karakalpakstanu sprawuja Prokurator Republiki Karakalpakstanu i podlegli mu "
        "prokuratorzy."))
    s.append(art(114,
        "Prokurator Republiki Karakalpakstanu jest mianowany i odwolywany przez Jokargy "
        "Kenes Republiki Karakalpakstanu za zgoda Prokuratora Generalnego Republiki "
        "Uzbekistanu.\n"
        "Prokuratorzy rejonowi i miejscy sa mianowani i odwolywani przez Prokuratora "
        "Generalnego Republiki Uzbekistanu na wniosek Prokuratora Republiki "
        "Karakalpakstanu.\n"
        "Kadencja Prokuratora Republiki Karakalpakstanu oraz prokuratorow rejonowych "
        "i miejskich trwa piec lat."))
    s.append(art(115,
        "Organy prokuratury Republiki Karakalpakstanu wykonuja swoje uprawnienia "
        "niezaleznie od jakichkolwiek organow panstwowych, stowarzyszen spolecznych "
        "i osob urzedowych, podlegajac wylacznie ustawie.\n"
        "Prokuratorzy zawieszaja czlonkostwo w partiach politycznych i innych "
        "stowarzyszeniach spolecznych dazacych do celow politycznych na czas pelnieniamanatu.\n"
        "Organizacja, uprawnienia i tryb dzialalnosci organow prokuratury sa "
        "okreslane ustawa."))
    s.append(art(116,
        "Na terytorium Republiki Karakalpakstanu zabrania sie tworzenia i "
        "funkcjonowania prywatnych lub spoldzielczych organizacji, stowarzyszen "
        "spolecznych i ich jednostek strukturalnych, samodzielnie wykonujacych zadania "
        "operacyjno-rozpoznawcze, sledcze lub inne specjalne zadania w zakresie "
        "zwalczania przestepczosci.\n"
        "Stowarzyszenia spoleczne i obywatele moga wspomagac organy scigania w ochronie "
        "praworzadnosci, porzadku publicznego oraz praw i wolnosci obywateli."))

    s.append(chapter("ROZDZIAL XXVI\nFINANSE I BUDZET"))
    s.append(art(117,
        "Budzet panstwowy Republiki Karakalpakstanu obejmuje budzet republikanski oraz "
        "budzety lokalne."))
    s.append(art(118,
        "Podzial dochodow i wydatkow budzetu panstwowego Republiki Karakalpakstanu "
        "miedzy budzet republikanski a budzety lokalne jest okreslany przez ustawy "
        "Republiki Karakalpakstanu."))

    # CZESC SZOSTA
    s.append(PageBreak())
    s.append(section("CZESC SZOSTA\nTRYB ZMIANY KONSTYTUCJI"))
    s.append(hr_blue())

    s.append(art(119,
        "Zmiany w Konstytucji Republiki Karakalpakstanu wprowadza sie ustawa przyjeta "
        "wiekszoscia co najmniej dwoch trzecich glosow ogolnej liczby deputowanych "
        "Jokargy Kenesu Republiki Karakalpakstanu albo w drodze referendum Republiki "
        "Karakalpakstanu."))
    s.append(art(120,
        "Jokargy Kenes Republiki Karakalpakstanu ma prawo przyjac ustawe o wprowadzeniu "
        "zmian do Konstytucji w ciagu szesciu miesiecy od zlozenia stosownego wniosku. "
        "Jezeli Jokargy Kenes Republiki Karakalpakstanu odrzucil wniosek o zmiane "
        "Konstytucji, moze on byc ponownie zlozony nie wczesniej niz po uplywie roku."))

    # Strona koncowa
    s.append(PageBreak())
    s.append(Spacer(1, 3*cm))
    s.append(HRFlowable(width="60%", thickness=2, color=GOLD,
                         hAlign='CENTER', spaceAfter=20))
    s.append(Paragraph(
        "KONSTYTUCJA REPUBLIKI KARAKALPAKSTANU",
        S['cover_republic']))
    s.append(Paragraph(
        "Przyjeta 9 kwietnia 1993 roku · Wydanie " + YEAR,
        S['cover_adopted']))
    s.append(Spacer(1, 0.5*cm))
    s.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">www.karakalpakvoice.org</link>',
        S['cover_link']))
    s.append(Paragraph(
        "Karakalpakstan — republika suwerenna · Dokument archiwalny · " + YEAR,
        S['cover_site']))
    s.append(HRFlowable(width="60%", thickness=2, color=GOLD,
                         hAlign='CENTER', spaceBefore=20))
    return s


# — Generowanie PDF ———————————————————————————————————————————————————
def build_pdf(output_path="constitution_2020_pl.pdf"):
    doc = BaseDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
        title="Konstytucja Republiki Karakalpakstanu " + YEAR,
        author="karakalpakvoice.org",
        subject="Konstytucja Republiki Karakalpakstanu",
        creator="www.karakalpakvoice.org"
    )
    doc.addPageTemplates([make_page_template(doc)])

    story = []
    story += build_cover()
    story += build_content()

    doc.build(story)
    print("PDF wygenerowany: " + output_path)


if __name__ == "__main__":
    build_pdf()