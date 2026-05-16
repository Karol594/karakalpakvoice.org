from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether, PageBreak
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
YEAR     = "2026"
EMBLEM   = "emblem.jpg"
SITE_URL = "https://www.karakalpakvoice.org"

DARK_BLUE  = colors.HexColor('#0d2b4e')
MID_BLUE   = colors.HexColor('#1a4a7a')
LIGHT_BLUE = colors.HexColor('#2c6fad')
GOLD       = colors.HexColor('#b8860b')
GRAY       = colors.HexColor('#555555')
LIGHT_GRAY = colors.HexColor('#cccccc')
LINK_COLOR = colors.HexColor('#1a4a7a')
RED        = colors.HexColor('#CC0000')

# — Style ————————————————————————————————————————————————————————————————
def make_styles():
    return {
        'cover_republic': ParagraphStyle(
            'cover_republic',
            fontName='DejaVuBold', fontSize=13,
            textColor=DARK_BLUE, alignment=TA_CENTER,
            spaceAfter=4, leading=16
        ),
        'cover_title': ParagraphStyle(
            'cover_title',
            fontName='DejaVuBold', fontSize=22,
            textColor=DARK_BLUE, alignment=TA_CENTER,
            spaceAfter=10, leading=28
        ),
        'cover_adopted': ParagraphStyle(
            'cover_adopted',
            fontName='DejaVu', fontSize=10,
            textColor=MID_BLUE, alignment=TA_CENTER,
            spaceAfter=4, leading=14
        ),
        'cover_amendments': ParagraphStyle(
            'cover_amendments',
            fontName='DejaVuIt', fontSize=8.5,
            textColor=GRAY, alignment=TA_CENTER,
            spaceAfter=4, leading=12
        ),
        'cover_year': ParagraphStyle(
            'cover_year',
            fontName='DejaVuBold', fontSize=16,
            textColor=LIGHT_BLUE, alignment=TA_CENTER,
            spaceAfter=6, leading=20
        ),
        'cover_site': ParagraphStyle(
            'cover_site',
            fontName='DejaVuSans', fontSize=9,
            textColor=GRAY, alignment=TA_CENTER,
            spaceAfter=2, leading=12
        ),
        'cover_link': ParagraphStyle(
            'cover_link',
            fontName='DejaVuSans', fontSize=9,
            textColor=LINK_COLOR, alignment=TA_CENTER,
            spaceAfter=2, leading=12
        ),
        'preamble_title': ParagraphStyle(
            'preamble_title',
            fontName='DejaVuBold', fontSize=13,
            textColor=DARK_BLUE, alignment=TA_CENTER,
            spaceBefore=14, spaceAfter=8, leading=18
        ),
        'preamble_text': ParagraphStyle(
            'preamble_text',
            fontName='DejaVu', fontSize=10,
            textColor=colors.black, alignment=TA_JUSTIFY,
            spaceAfter=8, leading=15
        ),
        'section_title': ParagraphStyle(
            'section_title',
            fontName='DejaVuBold', fontSize=12,
            textColor=DARK_BLUE, alignment=TA_CENTER,
            spaceBefore=16, spaceAfter=6, leading=16
        ),
        'chapter_title': ParagraphStyle(
            'chapter_title',
            fontName='DejaVuBold', fontSize=11,
            textColor=MID_BLUE, alignment=TA_CENTER,
            spaceBefore=12, spaceAfter=5, leading=15
        ),
        'article_title': ParagraphStyle(
            'article_title',
            fontName='DejaVuBold', fontSize=10,
            textColor=DARK_BLUE, alignment=TA_LEFT,
            spaceBefore=8, spaceAfter=3, leading=14
        ),
        'article_text': ParagraphStyle(
            'article_text',
            fontName='DejaVu', fontSize=10,
            textColor=colors.black, alignment=TA_JUSTIFY,
            spaceAfter=5, leading=15
        ),
        'excluded': ParagraphStyle(
            'excluded',
            fontName='DejaVuBold', fontSize=10,
            textColor=RED, alignment=TA_LEFT,
            spaceAfter=5, leading=14
        ),
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
        canvas.drawRightString(w - MARGIN, h - MARGIN + 0.6*cm,
                               "ROK " + YEAR)

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
    story = []
    story.append(Spacer(1, 1.5*cm))

    if os.path.exists(EMBLEM):
        img = Image(EMBLEM, width=4.5*cm, height=4.5*cm)
        img.hAlign = 'CENTER'
        story.append(img)
    story.append(Spacer(1, 0.6*cm))

    story.append(HRFlowable(width="80%", thickness=2,
                             color=GOLD, hAlign='CENTER', spaceAfter=10))

    story.append(Paragraph("REPUBLIKA KARAKALPAKSTANU", S['cover_republic']))
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph("KONSTYTUCJA", S['cover_title']))
    story.append(Spacer(1, 0.3*cm))

    story.append(HRFlowable(width="60%", thickness=1.5,
                             color=LIGHT_BLUE, hAlign='CENTER', spaceAfter=8))

    story.append(Paragraph(
        "PRZYJETA 9 KWIETNIA 1993 ROKU<br/>PRZEZ RADE NAJWYZSZA REPUBLIKI KARAKALPAKSTANU",
        S['cover_adopted']
    ))
    story.append(Spacer(1, 0.4*cm))

    amendments = (
        "(Z uwzglednieniem zmian i uzupelnien wprowadzonych: 26 lutego 1994 r. na "
        "pietnastej sesji Rady Najwyzszej Republiki Karakalpakstanu XII kadencji; "
        "31 pazdziernika 1995 r. na czwartej sesji oraz 15 grudnia 1997 r. na "
        "trzynastej sesji Jokargy Kenesu Republiki Karakalpakstanu I kadencji; "
        "12 listopada 2003 r. na dwunastej sesji Jokargy Kenesu Republiki "
        "Karakalpakstanu II kadencji; 27 czerwca 2014 r. na pietnastej sesji "
        "Jokargy Kenesu Republiki Karakalpakstanu; 29 czerwca 2019 r. na "
        "dwudziestej szostej sesji Jokargy Kenesu Republiki; 16 grudnia 2019 r. "
        "na dwudziestej dziewiatej sesji Jokargy Kenesu Republiki; 12 lutego "
        "2021 r. na pietnastej sesji Jokargy Kenesu Republiki.)"
    )
    story.append(Paragraph(amendments, S['cover_amendments']))
    story.append(Spacer(1, 1.2*cm))

    story.append(HRFlowable(width="50%", thickness=1,
                             color=LIGHT_GRAY, hAlign='CENTER', spaceAfter=10))
    story.append(Paragraph(YEAR, S['cover_year']))
    story.append(HRFlowable(width="50%", thickness=1,
                             color=LIGHT_GRAY, hAlign='CENTER', spaceAfter=10))

    story.append(Spacer(1, 1.0*cm))
    story.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">www.karakalpakvoice.org</link>',
        S['cover_link']
    ))
    story.append(Paragraph(
        "Karakalpakstan — republika suwerenna | Dokument archiwalny",
        S['cover_site']
    ))
    story.append(PageBreak())
    return story

# — Funkcje pomocnicze ————————————————————————————————————————————————
def art(num, text):
    items = []
    items.append(Paragraph("Artykul " + str(num) + ".", S['article_title']))
    for para in text.strip().split('\n'):
        para = para.strip()
        if para:
            items.append(Paragraph(para, S['article_text']))
    return KeepTogether(items)

def art_excluded(num):
    items = []
    items.append(Paragraph("Artykul " + str(num) + ".", S['article_title']))
    items.append(Paragraph("[WYKLUCZONE].", S['excluded']))
    return KeepTogether(items)

def section(text):
    return Paragraph(text, S['section_title'])

def chapter(text):
    return Paragraph(text, S['chapter_title'])

def hr_gold():
    return HRFlowable(width="40%", thickness=1.5,
                      color=GOLD, hAlign='CENTER',
                      spaceBefore=4, spaceAfter=4)

def hr_blue():
    return HRFlowable(width="100%", thickness=0.5,
                      color=LIGHT_BLUE, hAlign='CENTER',
                      spaceBefore=6, spaceAfter=6)

def excluded_item(text):
    return Paragraph(text, S['excluded'])

# — Tresc glowna ——————————————————————————————————————————————————————
def build_content():
    s = []

    # PREAMBUŁA
    s.append(Paragraph("PREAMBUŁA", S['preamble_title']))
    s.append(hr_gold())
    s.append(Paragraph(
        "Naród Republiki Karakalpakstanu, uroczyście proklamując swoje przywiązanie do praw "
        "człowieka i zasad suwerenności państwowej, świadomy wysokiej odpowiedzialności wobec "
        "obecnych i przyszłych pokoleń, opierając się na historycznym doświadczeniu rozwoju "
        "karakałpackiej państwowości, potwierdzając swoją wierność ideałom demokracji i "
        "sprawiedliwości społecznej, uznając nadrzędność powszechnie przyjętych norm prawa "
        "międzynarodowego, dążąc do zapewnienia godnego życia obywatelom republiki, stawiając "
        "sobie za cel stworzenie humanitarnego, demokratycznego państwa prawnego, w imię "
        "zapewnienia pokoju obywatelskiego i zgody narodowej — przyjmuje, poprzez swoich "
        "upoważnionych przedstawicieli, niniejszą Konstytucję Republiki Karakalpakstanu.",
        S['preamble_text']
    ))

    # CZĘŚĆ PIERWSZA
    s.append(PageBreak())
    s.append(section("CZĘŚĆ PIERWSZA.\nPODSTAWOWE ZASADY"))
    s.append(hr_blue())

    s.append(chapter("ROZDZIAŁ I\nSUWERENNOŚĆ PAŃSTWOWA"))
    s.append(art("1",
        "Karakalpakstan jest suwerenną, demokratyczną republiką wchodzącą w skład Republiki "
        "Uzbekistanu. Nazwy państwa „Republika Karakalpakstanu” i „Karakalpakstan” są równoważne.\n"
        "Wzajemne stosunki Republiki Uzbekistanu i Republiki Karakalpakstanu w ramach Konstytucji "
        "Republiki Uzbekistanu regulowane są umowami i porozumieniami zawieranymi między Republiką "
        "Uzbekistan a Republiką Karakalpakstanu.\n"
        "Republika Karakalpakstanu posiada prawo do wystąpienia ze składu Republiki Uzbekistanu na "
        "podstawie powszechnego referendum narodu Karakalpakstanu."
    ))
    s.append(art("2",
        "Państwo wyraża wolę narodu i służy jego interesom. Organy państwowe i funkcjonariusze "
        "publiczni są odpowiedzialni przed społeczeństwem i obywatelami."
    ))
    s.append(art("3",
        "Republika Karakalpakstanu samodzielnie rozstrzyga kwestie swojego podziału "
        "administracyjno‑terytorialnego, określa system organów władzy państwowej i administracji, "
        "prowadzi politykę zgodną z polityką Republiki Uzbekistanu.\n"
        "Terytorium i granice Republiki Karakalpakstanu są nienaruszalne, nie mogą być zmieniane "
        "i są niepodzielne."
    ))
    s.append(art("4",
        "Językami państwowymi Republiki Karakalpakstanu są język karakałpacki i język uzbecki.\n"
        "Republika Karakalpakstanu zapewnia poszanowanie języków, zwyczajów i tradycji narodów "
        "i grup etnicznych zamieszkujących jej terytorium oraz stwarza warunki dla ich rozwoju."
    ))
    s.append(art("5",
        "Republika Karakalpakstanu posiada własne symbole państwowe — flagę, herb i hymn — "
        "zatwierdzane ustawą."
    ))
    s.append(art("6", "Stolicą Republiki Karakalpakstanu jest miasto Nukus."))

    s.append(chapter("ROZDZIAŁ II\nWŁADZA NARODU"))
    s.append(art("7",
        "Naród jest jedynym źródłem władzy państwowej.\n"
        "Władza państwowa w Republice Karakalpakstanu sprawowana jest w interesie narodu i "
        "wyłącznie przez organy upoważnione do tego Konstytucją Republiki Karakalpakstanu oraz "
        "ustawami przyjętymi na jej podstawie.\n"
        "Przywłaszczanie sobie uprawnień władzy państwowej, zawieszanie lub zaprzestanie "
        "działalności organów władzy w sposób nieprzewidziany Konstytucją, a także tworzenie "
        "nowych lub równoległych struktur władzy są niekonstytucyjne i pociągają za sobą "
        "odpowiedzialność przewidzianą prawem."
    ))
    s.append(art("8",
        "Obywatelami Republiki Karakalpakstanu są obywatele Republiki Uzbekistanu zamieszkujący "
        "na terytorium Karakalpakstanu."
    ))
    s.append(art("9",
        "Najważniejsze kwestie życia państwowego i społecznego poddaje się pod dyskusję narodu "
        "i pod głosowanie powszechne (referendum). Tryb przeprowadzania referendum określa ustawa."
    ))
    s.append(art("10",
        "W imieniu narodu Karakalpakstanu może występować jedynie wybrany przez niego Jokargy "
        "Kenes republiki.\n"
        "Żadna część społeczeństwa, partia polityczna, organizacja społeczna, ruch ani osoba "
        "prywatna nie mogą występować w imieniu narodu Republiki Karakalpakstanu."
    ))
    s.append(art("11",
        "System władzy państwowej Republiki Karakalpakstanu opiera się na zasadzie podziału "
        "władzy na ustawodawczą, wykonawczą i sądowniczą."
    ))
    s.append(art("12",
        "Życie społeczne w Republice Karakalpakstanu rozwija się na podstawie różnorodności "
        "instytucji politycznych, ideologii i poglądów.\n"
        "Żadna ideologia nie może być ustanowiona jako oficjalna ideologia państwowa."
    ))
    s.append(art("13",
        "Demokracja w Republice Karakalpakstanu opiera się na uniwersalnych zasadach, zgodnie "
        "z którymi najwyższą wartością jest człowiek, jego życie, wolność, honor, godność oraz "
        "inne niezbywalne prawa.\n"
        "Demokratyczne prawa i wolności są chronione przez Konstytucję i ustawy."
    ))
    s.append(art("14",
        "Państwo opiera swoją działalność na zasadach sprawiedliwości społecznej i praworządności, "
        "działając w interesie dobrobytu człowieka i społeczeństwa."
    ))

    s.append(chapter("ROZDZIAŁ III\nNACZELNA MOC KONSTYTUCJI I PRAWA"))
    s.append(art("15",
        "W Republice Karakalpakstanu uznaje się bezwzględne nadrzędstwo Konstytucji i ustaw "
        "Republiki Uzbekistanu oraz Republiki Karakalpakstanu.\n"
        "Państwo, jego organy, funkcjonariusze publiczni, organizacje społeczne i obywatele "
        "działają zgodnie z Konstytucją i ustawami."
    ))
    s.append(art("16",
        "Żaden przepis niniejszej Konstytucji nie może być interpretowany na szkodę praw i "
        "interesów Republiki Karakalpakstanu.\n"
        "Żadna ustawa ani inny akt normatywno‑prawny nie może być sprzeczny z normami i "
        "zasadami Konstytucji."
    ))

    s.append(chapter("ROZDZIAŁ IV\nSTOSUNKI MIĘDZYNARODOWE I ZEWNĘTRZNO‑EKONOMICZNE\nREPUBLIKI KARAKALPAKSTANU"))
    s.append(art("17",
        "Międzynarodowe stosunki naukowe, kulturalne i zewnętrzno‑ekonomiczne Republiki "
        "Karakalpakstanu są realizowane zgodnie z ustawodawstwem Republiki Uzbekistanu i "
        "Republiki Karakalpakstanu."
    ))

    # CZĘŚĆ DRUGA
    s.append(PageBreak())
    s.append(section("CZĘŚĆ DRUGA\nPODSTAWOWE PRAWA, WOLNOŚCI I OBOWIĄZKI\nCZŁOWIEKA I OBYWATELA"))
    s.append(hr_blue())

    s.append(chapter("ROZDZIAŁ V\nPOSTANOWIENIA OGÓLNE"))
    s.append(art("18",
        "Wszyscy obywatele Republiki Karakalpakstanu mają równe prawa i wolności oraz są równi "
        "wobec prawa, bez względu na płeć, rasę, narodowość, język, religię, pochodzenie "
        "społeczne, przekonania, status osobisty i społeczny.\n"
        "Ulgi mogą być ustanawiane wyłącznie ustawą i muszą odpowiadać zasadom sprawiedliwości "
        "społecznej."
    ))
    s.append(art("19",
        "Obywatel Republiki Karakalpakstanu i państwo są związani wzajemnymi prawami i wzajemną "
        "odpowiedzialnością. Prawa i wolności obywateli, zagwarantowane w Konstytucji i ustawach, "
        "są nienaruszalne i nikt nie ma prawa pozbawić ich lub ograniczyć bez orzeczenia sądu."
    ))
    s.append(art("20",
        "Korzystanie przez obywatela z jego praw i wolności nie może naruszać prawnie chronionych "
        "interesów, praw i wolności innych osób, państwa ani społeczeństwa."
    ))

    s.append(chapter("ROZDZIA VI\nOBYWATELSTWO"))
    s.append(art("21",
        "Zgodnie z obowiązującą w Republice Uzbekistanu zasadą jednolitego obywatelstwa, każdy "
        "obywatel Republiki Karakalpakstanu jest obywatelem Republiki Uzbekistanu.\n"
        "Podstawy i tryb nabycia oraz utraty obywatelstwa określa Ustawa Republiki Uzbekistanu "
        "o obywatelstwie.\n"
        "Cudzoziemcom i osobom bez obywatelstwa przebywającym na terytorium Republiki "
        "Karakalpakstanu zapewnia się prawa i wolności zgodnie z normami prawa międzynarodowego. "
        "Podlegają oni obowiązkom ustanowionym Konstytucją i ustawami Republiki Karakalpakstanu "
        "oraz umowami międzynarodowymi Republiki Uzbekistanu."
    ))

    s.append(chapter("ROZDZIAŁ VII\nPRAWA I WOLNOŚCI OSOBISTE"))
    s.append(art("22",
        "Prawo do życia jest niezbywalnym prawem każdego człowieka. Zamach na życie jest "
        "najcięższym przestępstwem."
    ))
    s.append(art("23",
        "Każdy ma prawo do wolności i nietykalności osobistej. Nikt nie może być aresztowany ani "
        "przetrzymywany inaczej niż na podstawie ustawy."
    ))
    s.append(art("24",
        "Każdy oskarżony o popełnienie przestępstwa uważa się za niewinnego, dopóki jego wina nie "
        "zostanie udowodniona w trybie przewidzianym prawem, w jawnym postępowaniu sądowym, w "
        "którym zapewnia mu się wszelkie możliwości obrony.\n"
        "Nikt nie może być poddawany torturom, przemocy ani innemu okrutnemu lub poniżającemu "
        "traktowaniu.\n"
        "Nikt nie może być poddawany eksperymentom medycznym lub naukowym bez swojej zgody."
    ))
    s.append(art("25",
        "Każdy ma prawo do ochrony przed zamachem na jego honor i godność, przed ingerencją w "
        "życie prywatne oraz do nietykalności mieszkania.\n"
        "Nikt nie ma prawa wejść do mieszkania, dokonać przeszukania lub oględzin, naruszyć "
        "tajemnicy korespondencji i rozmów telefonicznych inaczej niż w przypadkach i trybie "
        "przewidzianych ustawą."
    ))
    s.append(art("26",
        "Obywatel Republiki Karakalpakstanu, będąc obywatelem Republiki Uzbekistanu, ma prawo "
        "do swobodnego poruszania się po terytorium Republiki Uzbekistanu, wjazdu do niej i "
        "wyjazdu z niej, z wyjątkiem ograniczeń ustanowionych ustawą."
    ))
    s.append(art("27",
        "Każdy ma prawo do wolności myśli, słowa i przekonań.\n"
        "Każdy ma prawo poszukiwać, otrzymywać i rozpowszechniać dowolne informacje, z wyjątkiem "
        "informacji skierowanych przeciwko istniejącemu porządkowi konstytucyjnemu oraz innych "
        "ograniczeń przewidzianych ustawą.\n"
        "Wolność poglądów i ich wyrażania może być ograniczona ustawą ze względu na ochronę "
        "tajemnicy państwowej lub innej tajemnicy chronionej prawem."
    ))
    s.append(art("28",
        "Wszystkie organy państwowe, organizacje społeczne i funkcjonariusze publiczni Republiki "
        "Karakalpakstanu są zobowiązani zapewnić obywatelom możliwość zapoznania się z "
        "dokumentami, decyzjami i innymi materiałami dotyczącymi ich praw i interesów."
    ))
    s.append(art("29",
        "Wolność sumienia jest gwarantowana wszystkim. Każdy ma prawo wyznawać dowolną religię "
        "lub nie wyznawać żadnej. Niedopuszczalne jest przymusowe narzucanie poglądów religijnych."
    ))

    s.append(chapter("ROZDZIAŁ VIII\nPRAWA POLITYCZNE"))
    s.append(art("30",
        "Obywatele Republiki Karakałpacji mają prawo do uczestniczenia w zarządzaniu sprawami "
        "społeczeństwa i państwa, zarówno bezpośrednio, jak i za pośrednictwem swoich "
        "przedstawicieli. Udział ten realizowany jest poprzez samorządność, przeprowadzanie "
        "referendów i demokratyczne formowanie organów państwowych, a także rozwój i doskonalenie "
        "kontroli społecznej nad działalnością organów państwowych.\n"
        "Tryb sprawowania kontroli społecznej nad działalnością organów państwowych określa ustawa."
    ))
    s.append(art("31",
        "Obywatele mają prawo do realizowania swojej aktywności społecznej w formie wieców, "
        "zgromadzeń i demonstracji, zgodnie z ustawodawstwem Republiki Karakałpacji. Organy "
        "władzy mają prawo wstrzymać lub zakazać przeprowadzania tych wydarzeń wyłącznie z "
        "uzasadnionych względów bezpieczeństwa."
    ))
    s.append(art("32",
        "Obywatele Republiki Karakałpacji mają prawo zrzeszać się w związki zawodowe, partie "
        "polityczne i inne stowarzyszenia społeczne oraz uczestniczyć w ruchach masowych.\n"
        "Nikt nie może naruszać praw, wolności i godności osób stanowiących mniejszość "
        "opozycyjną w partiach politycznych, stowarzyszeniach społecznych, ruchach masowych, a "
        "także w przedstawicielskich organach władzy."
    ))
    s.append(art("33",
        "Każdy ma prawo, zarówno indywidualnie, jak i wspólnie z innymi osobami, zwracać się z "
        "wnioskami, propozycjami i skargami do właściwych organów państwowych, instytucji lub "
        "przedstawicieli ludowych.\n"
        "Wnioski, propozycje lub skargi muszą być rozpatrzone w trybie i terminach określonych "
        "ustawą."
    ))

    s.append(chapter("ROZDZIAŁ IX\nPRAWA EKONOMICZNE I SOCJALNE"))
    s.append(art("34",
        "Każdy ma prawo do własności. Tajemnica wkładów bankowych oraz prawo dziedziczenia są "
        "gwarantowane ustawą."
    ))
    s.append(art("35",
        "Każdy ma prawo do pracy, do swobodnego wyboru zatrudnienia, do sprawiedliwych warunków "
        "pracy oraz do ochrony przed bezrobociem, w trybie określonym ustawą.\n"
        "Zakazuje się pracy przymusowej, z wyjątkiem wykonywania kary na podstawie wyroku sądu "
        "lub w innych przypadkach przewidzianych przez prawo."
    ))
    s.append(art("36",
        "Pracownicy najemni mają prawo do płatnego wypoczynku. Czas pracy oraz wymiar płatnego "
        "urlopu wypoczynkowego określa ustawa."
    ))
    s.append(art("37",
        "Każdy ma prawo do zabezpieczenia społecznego na starość, w przypadku utraty zdolności "
        "do pracy, a także utraty żywiciela i w innych przypadkach przewidzianych ustawą.\n"
        "Emerytury, zasiłki i inne formy pomocy społecznej nie mogą być niższe niż oficjalnie "
        "ustalona granica minimum egzystencji.."
    ))
    s.append(art("38", 
    "Każdy ma prawo do fachowej opieki medycznej."
    ))
    s.append(art("39",
        "Każdy ma prawo do nauki. Państwo gwarantuje bezpłatne uzyskanie wykształcenia ogólnego. "
        "Szkolnictwo znajduje się pod nadzorem państwa."
    ))
    s.append(art("40",
        "Każdemu gwarantuje się wolność twórczości artystycznej, naukowej i technicznej oraz "
        "prawo do korzystania z dorobku kultury.\n"
        "Państwo dba o rozwój kulturalny, naukowy i techniczny społeczeństwa."
    ))

    s.append(chapter("ROZDZIAŁ X\nGWARANCJE PRAW I WOLNOŚCI CZŁOWIEKA"))
    s.append(art("41",
        "Państwo zapewnia prawa i wolności obywateli, zapisane w Konstytucji i ustawach.."
    ))
    s.append(art("42",
        "Każdemu gwarantuje się ochronę sądową jego praw i wolności, prawo do zaskarżenia do "
        "sądu niezgodnych z prawem działań organów państwowych, urzędników oraz organizacji "
        "społecznych."
    ))
    s.append(art("43",
        "Prawa nieletnich, osób niepełnosprawnych oraz samotnych osób starszych znajdują się pod "
        "ochroną państwa."
    ))
    s.append(art("44", 
    "Kobiety i mężczyźni mają równe prawa."
    ))
    s.append(chapter("ROZDZIAŁ XI\nOBOWIĄZKI OBYWATELI"))
    s.append(art("45", 
    "Wszyscy obywatele ponoszą obowiązki nałożone na nich w Konstytucji."
    ))
    s.append(art("46",
        "Obywatele są zobowiązani do przestrzegania Konstytucji i ustaw, poszanowania praw, "
        "wolności, czci i godności innych ludzi."
    ))
    s.append(art("47",
        "Obywatele są zobowiązani do ochrony dziedzictwa historycznego, duchowego i kulturowego "
        "narodu Karakałpakstanu.\n"
        "Zabytki kultury podlegają ochronie państwa."
    ))
    s.append(art("48", 
    "Obywatele są zobowiązani do dbałości o środowisko naturalne."
    ))
    s.append(art("49",
        "Obywatele są zobowiązani do płacenia określonych ustawą podatków oraz opłat lokalnych.."
    ))
    s.append(art("50",
        "Obrona Republiki Uzbekistanu oraz Republiki Karakałpakstanu jest obowiązkiem każdego "
        "obywatela Republiki Karakałpakstanu. Obywatele są zobowiązani do odbycia służby "
        "wojskowej lub alternatywnej w trybie określonym ustawą."
    ))

    # CZĘŚĆ TRZECIA
    s.append(PageBreak())
    s.append(section("CZĘŚĆ TRZECIA.\nSPOŁECZEŃSTWO I JEDNOSTKA"))
    s.append(hr_blue())

    s.append(chapter("ROZDZIAŁ XII\nEKONOMICZNE PODSTAWY SPOŁECZEŃSTWA"))
    s.append(art("51",
        "Podstawę gospodarki Karakałpakstanu, ukierunkowanej na rozwój stosunków rynkowych, "
        "stanowi własność w jej różnych formach. Państwo gwarantuje wolność działalności "
        "gospodarczej, przedsiębiorczości i pracy, uwzględniając priorytet praw konsumenta,, "
        "a także równouprawnienie i ochronę prawną wszystkich form własności\n"
        "Własność prywatna, obok innych form własności, jest nienaruszalna i chroniona przez "
        "państwo. Właściciel może zostać jej pozbawiony jedynie w przypadkach i w trybie "
        "przewidzianym ustawą."
    ))
    s.append(art("52",
        "Właściciel według własnego uznania posiada, użytkuje i rozporządza należącym do niego "
        "majątkiem. Korzystanie z majątku nie powinno wyrządzać szkody środowisku ekologicznemu, "
        "naruszać praw oraz chronionych ustawą interesów obywateli, osób prawnych i państwa."
    ))
    s.append(art("53",
        "Ziemia, jej zasoby, wody, świat roślinny i zwierzęcy oraz inne zasoby naturalne stanowią "
        "bogactwo ogólnonarodowe, podlegają racjonalnemu wykorzystaniu i są chronione przez "
        "państwo."
    ))

    s.append(chapter("ROZDZIAŁ XIII\nORGANIZACJE SPOŁECZNE"))
    s.append(art("54",
        "Organizacjami społecznymi w Republice Karakalpakstanu są związki zawodowe, partie "
        "polityczne, stowarzyszenia naukowców, organizacje kobiece, organizacje weteranów i "
        "młodzieży, związki twórcze, ruchy masowe oraz inne zrzeszenia obywateli zarejestrowane "
        "wtrybie określonym ustawą."
    ))
    s.append(art("55",
        "Zabrania się tworzenia i działalności partii politycznych oraz innych organizacji "
        "społecznych, których celem jest gwałtowna zmiana ustroju konstytucyjnego, występowanie "
        "przeciwko suwerenności, integralności i bezpieczeństwu Republiki, przeciwko "
        "konstytucyjnym prawom i wolnościom jej obywateli, propagowanie wojny, nienawiści "
        "społecznej, narodowej, religijnej lub rasowej, a także naruszanie zdrowia i moralności "
        "narodu, jak również tworzenia organizacji paramilitarnych oraz partii politycznych "
        "o charakterze narodowym lub religijnym.\n"
        "Zabrania się tworzenia tajnych stowarzyszeń i organizacji."
    ))
    s.append(art("56",
        "Państwo zapewnia przestrzeganie praw i prawnie chronionych interesów organizacj "
        "społecznych oraz stwarza im równe możliwości prawne uczestnictwa w życiu publicznym.\n"
        "Niedopuszczalna jest ingerencja organów państwowych i urzędników w działalność "
        "organizacji społecznych, jak również ingerencja organizacji społecznych w działalność "
        "organów państwowych i urzędników."
    ))
    s.append(art("57",
        "Związki zawodowe wyrażają i chronią społeczno‑ekonomiczne prawa i interesy pracowników. "
        "Członkostwo w związkach zawodowych jest dobrowolne."
    ))
    s.append(art("58",
        "Partie polityczne wyrażają wolę polityczną różnych warstw i grup społecznych i poprzez "
        "swoich demokratycznie wybranych przedstawicieli uczestniczą w kształtowaniu władzy "
        "państwowej. Partie polityczne są zobowiązane do przedstawiania Jokargy Kenesowi lub "
        "upoważnionemu przez niego organowi publicznych sprawozdań o źródłach finansowania swojej "
        "działalności."
    ))
    s.append(art("59",
        "Organizacje i wspólnoty religijne są oddzielone od państwa i równe wobec prawa. Państwo "
        "nie ingeruje w działalność wspólnot religijnych."
    ))
    s.append(art("60",
        "Rozwiązanie, zakaz lub ograniczenie działalności organizacji społecznych może nastąpić "
        "wyłącznie na podstawie decyzji sądu."
    ))

    s.append(chapter("ROZDZIAŁ XIV\nRODZINA"))
    s.append(art("61",
        "Rodzina jest podstawową komórką społeczeństwa i ma prawo do ochrony ze strony "
        "społeczeństwa i państwa.\n"
        "Małżeństwo opiera się na dobrowolnej zgodzie i równości stron."
    ))
    s.append(art("62",
        "Rodzice są zobowiązani utrzymywać i wychowywać dzieci do osiągnięcia przez nie "
        "pełnoletności.\n"
        "Państwo i społeczeństwo zapewniają utrzymanie, wychowanie i edukację dzieci sierot oraz "
        "dzieci pozbawionych opieki rodzicielskiej, a także wspierają działalność charytatywną "
        "na ich rzecz."
    ))
    s.append(art("63",
        "Dzieci są równe wobec prawa niezależnie od pochodzenia i stanu cywilnego rodziców.\n"
        "Macierzyństwo i dzieciństwo znajdują się pod ochroną państwa."
    ))
    s.append(art("64",
        "Pełnoletnie, zdolne do pracy dzieci są zobowiązane troszczyć się o swoich rodziców."
    ))

    s.append(chapter("ROZDZIAŁ XV\nŚRODKI MASOWEGO PRZEKAZU"))
    s.append(art("65",
        "Środki masowego przekazu są wolne i działają zgodnie z ustawą. Poniosą "
        "odpowiedzialność, w trybie określonym prawem, za rzetelność przekazywanych informacji.\n"
        "Cenzura jest niedopuszczalna."
    ))

    # CZĘŚĆ CZWARTA
    s.append(PageBreak())
    s.append(section("CZĘŚĆ CZWARTA.\nPODZIAŁ TERYTORIALNO‑ADMINISTRACYJNY"))
    s.append(hr_blue())

    s.append(chapter("ROZDZIAŁ XVI.\nPODZIAŁ TERYTORIALNO‑ADMINISTRACYJNY\nREPUBLIKI KARAKALPAKSTANU"))
    s.append(art("66",
        "Republika Karakalpakstanu składa się z rejonów, miast, osiedli i auli."
    ))
    s.append(art("67",
        "Tworzenie i likwidacja rejonów i miast, a także zmiana ich granic, należy do "
        "kompetencji Jokargy Kenesu Republiki Karakalpakstanu."
    ))

    # CZĘŚĆ PIĄTA
    s.append(PageBreak())
    s.append(section("CZĘŚĆ PIĄTA\nORORGANIZACJA WŁADZY PAŃSTWOWEJ"))
    s.append(hr_blue())

    s.append(chapter("ROZDZIAŁ XVII.\nJOKARGY KENES REPUBLIKI KARAKALPAKSTANU"))
    s.append(art("68",
        "Najwyższym państwowym organem przedstawicielskim jest Jokargy Kenes Republiki "
        "Karakalpakstanu, sprawujący władzę ustawodawczą."
    ))
    s.append(art("69",
        "Jokargy Kenes Republiki Karakalpakstanu składa się z 65 deputowanych wybieranych w "
        "okręgach terytorialnych na zasadzie wielopartyjności na okres 5 lat.\n"
        "Prawo bycia wybranym do Jokargy Kenesu Republiki Karakalpakstanu przysługuje obywatelom "
        "Republiki Uzbekistanu i Republiki Karakalpakstanu, którzy w dniu wyborów ukończyli 25 lat "
        "i nieprzerwanie zamieszkują na terytorium Republiki Uzbekistanu i Republiki "
        "Karakalpakstanu co najmniej pięć lat.\n"
        "Wymogi stawiane kandydatom na deputowanych określa ustawa."
    ))

    # Artykul 70 — wykluczone punkty na czerwono
    s.append(Paragraph("Artykul 70.", S['article_title']))
    s.append(Paragraph(
        "o wyłącznych kompetencji Jokargy Kenesu Republiki Karakalpakstanu należy:",
        S['article_text']
    ))
    s.append(Paragraph(
        "1) uchwalanie Konstytucji Republiki Karakalpakstanu oraz wprowadzanie do niej zmian i "
        "uzupełnień;",
        S['article_text']
    ))
    s.append(Paragraph(
        "2) uchwalanie ustaw Republiki Karakalpakstanu, wprowadzanie do nich zmian i uzupełnień "
        "oraz ich interpretacja;",
        S['article_text']
    ))
    s.append(Paragraph(
        "3) uchwalanie państwowych programów strategicznych rozwoju gospodarczego i społecznego;",
        S['article_text']
    ))
    s.append(Paragraph(
        "4) ybór Przewodniczącego Jokargy Kenesu Republiki Karakalpakstanu i jego zastępcy;",
        S['article_text']
    ))
    s.append(Paragraph(
        "5) twotworzenie Prezydium Jokargy Kenesu Republiki Karakalpakstanu;",
        S['article_text']
    ))
    s.append(Paragraph(
        "6) powoływanie i odwoływanie Przewodniczącego Rady Ministrów Republiki "
        "Karakalpakstanu na wniosek Przewodniczącego Jokargy Kenesu, uzgodniony z Prezydentem "
        "Republiki Uzbekistanu;",
        S['article_text']
    ))
    s.append(Paragraph(
        "7) powoływanie i odwoływanie zastępców Przewodniczącego Rady Ministrów oraz członków "
        "Rady Ministrów Republiki Karakalpakstanu, tworzenie i likwidacja ministerstw, komitetów "
        "państwowych i innych organów administracji państwowej Republiki Karakalpakstanu;",
        S['article_text']
    ))
    s.append(Paragraph(
        "8) wybór Komitetu Nadzoru Konstytucyjnego Republiki Karakalpakstanu, wybór i "
        "odwoływanie przewodniczącego i jego zastępców Sądu Republiki Karakalpakstanu oraz "
        "przewodniczącego i jego zastępcy Sądu Administracyjnego Republiki Karakalpakstanu;",
        S['article_text']
    ))
    s.append(excluded_item("9) [WYKLUCZONE];"))
    s.append(Paragraph(
        "10) powoływanie i odwoływanie Prokuratora Republiki Karakalpakstanu na wniosek "
        "Prezydium Jokargy Kenesu, uzgodniony z Prokuratorem Generalnym Republiki Uzbekistanu;",
        S['article_text']
    ))
    s.append(excluded_item("11) [WYKLUCZONE];"))
    s.append(Paragraph(
        "12) zawieszanie i uchylanie decyzji lokalnych Rad Deputowanych Ludowych;",
        S['article_text']
    ))
    s.append(Paragraph(
        "13) ustawowe regulowanie kwestii podziału terytorialno‑administracyjnego;",
        S['article_text']
    ))
    s.append(Paragraph(
        "14) określanie systemu i kompetencji republikańskich i lokalnych organów władzy "
        "państwowej;",
        S['article_text']
    ))
    s.append(Paragraph(
        "15) zatwierdzanie, na wniosek Rady Ministrów Republiki Karakalpakstanu, budżetu "
        "państwowego Republiki Karakalpakstanu oraz sprawozdań z jego wykonania;",
        S['article_text']
    ))
    s.append(Paragraph(
        "16) ustanawianie państwowych odznaczeń i tytułów honorowych Republiki Karakalpakstanu;",
        S['article_text']
    ))
    s.append(Paragraph(
        "17) wyznaczanie wyborów do Jokargy Kenesu Republiki Karakalpakstanu i lokalnych "
        "organów przedstawicielskich; tworzenie Centralnej Komisji Wyborczej;",
        S['article_text']
    ))
    s.append(Paragraph(
        "18) kierowanie do Sądu Konstytucyjnego Republiki Uzbekistanu wniosków dotyczących "
        "zgodności aktów najwyższych organów władzy państwowej i administracji Republiki "
        "Uzbekistanu z Konstytucją Republiki Uzbekistanu;",
        S['article_text']
    ))
    s.append(Paragraph(
        "19) sprawowanie kontroli parlamentarnej oraz wykonywanie innych uprawnień "
        "przewidzianych niniejszą Konstytucją.",
        S['article_text']
    ))

    s.append(art("71",
        "Działalność Jokargy Kenesu Republiki Karakalpakstanu odbywa się w trybie określonym "
        "Konstytucją oraz Regulaminem Jokargy Kenesu Republiki Karakalpakstanu."
    ))
    s.append(art("72",
        "Posiedzenie Jokargy Kenesu Republiki Karakalpakstanu jest prawomocne, jeżeli uczestniczy "
        "w nim co najmniej dwie trzecie ogólnej liczby deputowanych."
    ))
    s.append(art("73",
        "W posiedzeniach Jokargy Kenesu Republiki Karakalpakstanu i jego organów mogą uczestniczyć: "
        "Przewodniczący Rady Ministrów Republiki Karakalpakstanu i jego zastępcy, ministrowie, "
        "przewodniczący komitetów państwowych, kierownicy innych organów administracji panstwowej, "
        "przewodniczący Komitetu Nadzoru Konstytucyjnego, przewodniczący Sądu Republiki "
        "Karakalpakstanu, przewodniczący Sądu Administracyjnego Republiki "
        "Karakalpakstanu oraz Prokurator Republiki Karakalpakstanu."
    ))
    s.append(art("74",
        "Po upływie kadencji Jokargy Kenes Republiki Karakalpakstanu kontynuuje swoją działalność "
        "aż do rozpoczęcia pracy przez Jokargy Kenes nowej kadencji.\n"
        "Pierwsze po wyborach posiedzenie Jokargy Kenesu Republiki Karakalpakstanu zwoływane jest "
        "przez Centralną Komisję Wyborczą nie później niż dwa miesiące po wyborach."
    ))
    s.append(art("75",
        "Prawo inicjatywy ustawodawczej w Jokargy Kenesie Republiki Karakalpakstanu przysługuje "
        "deputowanym Jokargy Kenesu, Radzie Ministrów Republiki Karakalpakstanu, Komitetowi "
        "Nadzoru Konstytucyjnego Republiki Karakalpakstanu, "
        "Sądowi Republiki Karakalpakstanu, Sądowi Administracyjnemu Republiki Karakalpakstanu "
        "oraz Prokuratorowi Republiki Karakalpakstanu."
    ))
    s.append(art("76",
        "Jokargy Kenes Republiki Karakalpakstanu uchwala ustawy, uchwały i inne akty. Do "
        "przyjęcia ustawy wymagana jest większość głosów wszystkich deputowanych Jokargy Kenesu "
        "Republiki Karakalpakstanu.\n"
        "Ustawy Republiki Karakalpakstanu uzyskują moc prawną po ich przyjęciu przez Jokargy Kenes "
        "i oficjalnym ogłoszeniu w trybie przewidzianym ustawą."
    ))
    s.append(art("77",
        "Jokargy Kenes Republiki Karakalpakstanu wybiera spośród deputowanych komitety i komisje "
        "do prowadzenia prac legislacyjnych, wstępnego rozpatrywania i przygotowywania spraw "
        "kierowanych pod obrady Jokargy Kenesu oraz do kontroli wykonania ustaw i innych decyzji "
        "Jokargy Kenesu.\n"
        "Jokargy Kenes Republiki Karakalpakstanu może w razie potrzeby tworzyć komisje deputackie, "
        "rewizyjne i inne — na zasadzie stałej lub tymczasowej.\n"
        "Kompetencje oraz tryb działalności komitetów i komisji Jokargy Kenesu Republiki "
        "Karakalpakstanu określa ustawa"
    ))
    s.append(art("78",
        "Deputowanym Jokargy Kenesu Republiki Karakalpakstanu przysługuje zwrot kosztów "
        "związanych z wykonywaniem mandatu w trybie określonym ustawą. Deputowani pracujący w "
        "Jokargy Kenesie i jego organach na zasadzie stałej nie mogą w okresie pełnienia mandatu "
        "zajmować żadnego innego płatnego stanowiska ani prowadzić działalności gospodarczej."
    ))
    s.append(art("79",
        "Deputowany Jokargy Kenesu Republiki Karakalpakstanu korzysta z immunitetu. Nie może on "
        "zostać pociągnięty do odpowiedzialności karnej, aresztowany ani poddany środkom "
        "administracyjnym nakładanym w trybie sądowym bez zgody Jokargy Kenesu Republiki "
        "Karakalpakstanu."
    ))

    s.append(chapter("ROZDZIAŁ XVIII.\nPRZEWODNICZĄCY JOKARGY KENESU\nREPUBLIKI KARAKALPAKSTANU"))
    s.append(art("80",
        "Przewodniczący Jokargy Kenesu Republiki Karakalpakstanu jest Kierownikiem Republiki "
        "Karakalpakstanu oraz najwyższym urzędnikiem Republiki Karakalpakstanu.\n"
        "Przewodniczący Jokargy Kenesu Republiki Karakalpakstanu jest wybierany przez Jokargy "
        "Kenes Republiki Karakalpakstanu, w porozumieniu z Prezydentem Republiki Uzbekistanu, "
        "spośród deputowanych Jokargy Kenesu, w głosowaniu tajnym, na okres kadencji Jokargy "
        "Kenesu Republiki Karakalpakstanu"
    ))
    s.append(art("81",
        "Przewodniczacy Jokargy Kenesu Republiki Karakalpakstanu:\n"
        "1) zapewnia współdziałanie najwyższych organów władzy ustawodawczej i wykonawczej "
        "Republiki Karakalpakstanu;\n"
        "2) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu sprawozdania o sytuacji w "
        "republice oraz w innych ważnych kwestiach;\n"
        "3) organizuje wdrażanie ustaw i innych decyzji Oliy Majlisu Republiki Uzbekistanu, "
        "dekretów i innych aktów Prezydenta Republiki Uzbekistanu; organizuje kontrolę nad "
        "wykonaniem ustaw i uchwał Jokargy Kenesu Republiki Karakalpakstanu;\n"
        "4) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu kandydatury na stanowiska "
        "zastępcy Przewodniczącego Jokargy Kenesu, przewodniczących komitetów i komisji "
        "Jokargy Kenesu;\n"
        "5) w porozumieniu z Prezydentem Republiki Uzbekistanu przedstawia Jokargy Kenesowi "
        "kandydaturę na stanowisko Przewodniczącego Rady Ministrów Republiki Karakalpakstanu;\n"
        "6) ianuje i odwołuje hakimów rejonów i miast oraz ich zastępców, z późniejszym "
        "zatwierdzeniem przez właściwe Rady Deputowanych Ludowych;\n"
        "7) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, w porozumieniu z Prezydium "
        "Jokargy Kenesu, kandydatury na stanowiska Przewodniczącego i członków Komitetu Nadzoru "
        "Konstytucyjnego Republiki Karakalpakstanu;\n"
        "8) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, w porozumieniu z Prezydentem "
        "Republiki Uzbekistanu i na podstawie opinii Najwyższej Rady Sędziowskiej Republiki "
        "Uzbekistanu, kandydatury na stanowiska przewodniczącego i jego zastępców Sądu Republiki "
        "Karakalpakstanu oraz przewodniczącego i jego zastępcy Sądu Administracyjnego Republiki "
        "Karakalpakstanu;\n"
        "9) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, w porozumieniu z Prezydium "
        "Jokargy Kenesu, kandydaturę na stanowisko przewodniczącego Państwowego Komitetu Republiki "
        "Karakalpakstanu ds. Ochrony Środowiska Naturalnego i Ekologii;\n"
        "10) sprawuje ogólne kierownictwo przygotowaniem spraw kierowanych pod obrady Jokargy "
        "Kenesu, zwołuje posiedzenia Jokargy Kenesu, wspólnie z przewodniczącymi komitetów i "
        "komisji ustala propozycje do porządku obrad;\n"
        "11) organizuje pracę Jokargy Kenesu i jego Prezydium, przewodniczy ich posiedzeniom, "
        "podpisuje ustawy Republiki Karakalpakstanu i inne akty przyjęte przez Jokargy Kenes i "
        "jego Prezydium, kieruje i koordynuje działalność komitetów i komisji Jokargy Kenesu;\n"
        "12) przedstawia kandydatury do odznaczeń państwowych Republiki Karakalpakstanu i nadania "
        "tytułów honorowych Republiki Karakalpakstanu;\n"
        "13) występuje z wnioskiem o ułaskawienie skazanych obywateli;\n"
        "14) organizuje publiczne konsultacje projektów ustaw i innych ważnych kwestii życia "
        "państwowego;\n"
        "15) wykonuje inne uprawnienia przewidziane obowiązującymi aktami prawnymi.\n"
        "Przewodniczący Jokargy Kenesu Republiki Karakalpakstanu ma prawo kierować sprawy "
        "należące do jego kompetencji pod obrady Prezydium Jokargy Kenesu."
    ))
    s.append(art("82",
        "Przewodniczący Jokargy Kenesu Republiki Karakalpakstanu wydaje zarządzenia w sprawach "
        "należących do jego kompetencji."
    ))
    s.append(art("83",
        "Przewodniczący Jokargy Kenesu Republiki Karakalpakstanu może zostać odwołany przez "
        "Jokargy Kenes w przypadku naruszenia Konstytucji i ustaw Republiki Karakalpakstanu. "
        "Decyzja o odwołaniu podejmowana jest większością co najmniej dwóch trzecich ogólnej "
        "liczby deputowanych Jokargy Kenesu, na wniosek jednej trzeciej deputowanych, z "
        "uwzględnieniem opinii Komitetu Nadzoru Konstytucyjnego Republiki Karakalpakstanu.\n"
        "Uprawnienia Przewodniczącego mogą zostać zakończone przed upływem kadencji na jego "
        "własny wniosek, a także w przypadku niemożności wykonywania obowiązków z powodu stanu "
        "zdrowia lub innych przyczyn.\n"
        "W takich przypadkach wybory nowego Przewodniczącego Jokargy Kenesu Republiki "
        "Karakalpakstanu przeprowadza się w terminie dwóch miesięcy."
    ))

    s.append(chapter("ROZDZIAŁ XIX.\nPREZYDIUM JOKARGY KENESU\nREPUBLIKI KARAKALPAKSTAN"))
    s.append(art("84",
        "W celu organizacji pracy Rady Najwyższej (Dżokargy Kenes) Republiki Karakałpacji oraz wykonywania "
        "innych uprawnień tworzone jest Prezydium Rady Najwyższej Republiki Karakałpacji.\n"
        "W skład Prezydium Rady Najwyższej Republiki Karakałpacji wchodzą Przewodniczący "
        "Rady Najwyższej, jego zastępca, przewodniczący komitetów i komisji Rady Najwyższej oraz "
        "liderzy grup partyjnych w Radzie Najwyższej Republiki Karakałpacji."
    ))
    s.append(art("85",
        "Prezydium Jokargy Kenesu Republiki Karakalpakstanu:\n"
        "1) przygotowuje propozycje dotyczące porządku obrad i trybu pracy sesji Jokargy Kenesu;\n"
        "2) wysłuchuje sprawozdań komitetów i komisji Jokargy Kenesu o prowadzonej pracy oraz "
        "informacji o wykonaniu ustaw Republiki Karakalpakstanu i decyzji Jokargy Kenesu;\n"
        "3) organizuje planowanie prac legislacyjnych;\n"
        "4) na wniosek Przewodniczącego Jokargy Kenesu wstępnie rozpatruje projekty ustaw i inne "
        "dokumenty;\n"
        "5) analizuje propozycje i uwagi deputowanych zgłoszone na sesji Jokargy Kenesu i "
        "podejmuje odpowiednie decyzje;\n"
        "6) przyznaje odznaczenia państwowe Republiki Karakalpakstanu oraz nadaje honorowe tytuły "
        "Republiki Karakalpakstanu;\n"
        "7) w okresie między sesjami, na wniosek Przewodniczącego Rady Ministrów Republiki "
        "Karakalpakstanu, powołuje i odwołuje zastępców Przewodniczącego Rady Ministrów oraz "
        "członków Rady Ministrów Republiki Karakalpakstanu, tworzy i likwiduje ministerstwa, "
        "komitety państwowe i inne organy administracji państwowej Republiki Karakalpakstanu, "
        "przedstawiając następnie odpowiednie uchwały do zatwierdzenia przez Jokargy Kenes;\n"
        "8) powołuje i odwołuje sędziów sądów Republiki Karakalpakstanu, przewodniczących i "
        "sędziów sądów międzyrejonowych oraz rejonowych (miejskich) Republiki Karakalpakstanu;\n"
        "9) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, w porozumieniu z Prokuratorem "
        "Generalnym Republiki Uzbekistanu, kandydaturę na stanowisko Prokuratora Republiki "
        "Karakalpakstanu;\n"
        "10) w okresie między sesjami wyraża zgodę na pociągnięcie deputowanego Jokargy Kenesu "
        "do odpowiedzialności w przypadkach i trybie określonych ustawą, a także na rozwiązanie "
        "z nim umowy o pracę z inicjatywy pracodawcy;\n"
        "11) rozpatruje inne kwestie związane z pracą Jokargy Kenesu i skutecznym wykonywaniem "
        "obowiązków przez deputowanych.\n"
        "Prezydium Jokargy Kenesu Republiki Karakalpakstanu wydaje uchwały w sprawach należących "
        "do jego kompetencji, które są publikowane w trybie przewidzianym prawem."
    ))

    s.append(chapter("ROZDZIAŁ XX.\nRADA MINISTRÓW REPUBLIKI KARAKALPAKSTANU"))
    s.append(art("86",
        "Rada Ministrów Republiki Karakalpakstanu — Rząd Republiki Karakalpakstanu — jest "
        "najwyższym organem władzy wykonawczo‑administracyjnej Republiki Karakalpakstanu."
    ))
    s.append(art("87",
        "Rada Ministrów Republiki Karakalpakstanu jest powoływana przez Jokargy Kenes Republiki "
        "Karakalpakstanu.\n"
        "Rada Ministrów Republiki Karakalpakstanu zapewnia kierowanie efektywnym funkcjonowaniem "
        "gospodarki, sfery społecznej i duchowej, wykonaniem ustaw Republiki Uzbekistanu i innych "
        "decyzji Oliy Majlisu Republiki Uzbekistanu, dekretów, uchwał i zarządzeń Prezydenta "
        "Republiki Uzbekistanu, uchwał i zarządzeń Gabinetu Ministrów Republiki Uzbekistanu, "
        "ustaw Republiki Karakalpakstanu i innych decyzji Jokargy Kenesu Republiki "
        "Karakalpakstanu, uchwał Prezydium Jokargy Kenesu Republiki Karakalpakstanu.\n"
        "Rada Ministrów Republiki Karakalpakstanu zawiesza lub uchyla akty organów administracji "
        "państwowej Republiki Karakalpakstanu, a także akty hakimów rejonów i miast."
    ))
    s.append(art("88",
        "Radą Ministrów Republiki Karakalpakstanu kieruje Przewodniczący, powoływany na stanowisko "
        "przez Jokargy Kenes Republiki Karakalpakstanu na wniosek Przewodniczącego Jokargy Kenesu, "
        "uzgodniony z Prezydentem Republiki Uzbekistanu.\n"
        "Przewodniczący Rady Ministrów Republiki Karakalpakstanu z urzędu wchodzi w skład Gabinetu "
        "Ministrów Republiki Uzbekistanu.\n"
        "Przewodniczący Rady Ministrów Republiki Karakalpakstanu:\n"
        "1) kieruje działalnością rządu i podejmuje działania zapewniające skuteczne wykonywanie "
        "jego uprawnień;\n"
        "2) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, a w okresie między sesjami — "
        "Prezydium Jokargy Kenesu, kandydatury na stanowiska zastępców Przewodniczącego Rady "
        "Ministrów oraz członków Rady Ministrów Republiki Karakalpakstanu;\n"
        "3) rozdziela obowiązki między zastępców Przewodniczącego Rady Ministrów, z późniejszym "
        "zatwierdzeniem przez Prezydium Rady Ministrów;\n"
        "4) przedstawia Jokargy Kenesowi Republiki Karakalpakstanu, a w okresie między sesjami — "
        "Prezydium Jokargy Kenesu, propozycje dotyczące tworzenia i likwidacji ministerstw, "
        "komitetów państwowych i innych organów administracji państwowej Republiki "
        "Karakalpakstanu;\n"
        "5) przedstawia Przewodniczącemu Jokargy Kenesu Republiki Karakalpakstanu kandydatury "
        "na stanowiska hakimów rejonów i miast oraz ich zastępców;\n"
        "6) przewodniczy posiedzeniom Rady Ministrów i jej Prezydium;\n"
        "7) zapewnia kolegialność pracy Rady Ministrów;\n"
        "8) podejmuje decyzje w sprawach państwowych i gospodarczych, które nie wymagają "
        "rozpatrzenia na posiedzeniu Rady Ministrów lub jej Prezydium\n"
        "9) wykonuje inne uprawnienia przewidziane ustawą."
    ))
    s.append(art("89",
        "Rada Ministrów Republiki Karakalpakstanu jest odpowiedzialna i podlega "
        "sprawozdawczości przed Jokargy Kenesem Republiki Karakalpakstanu.\n"
        "Rada Ministrów Republiki Karakalpakstanu składa sprawozdanie ze swojej działalności "
        "przed Jokargy Kenesem co najmniej raz w roku.\n"
        "Rada Ministrów Republiki Karakalpakstanu składa swoje uprawnienia przed nowo wybranym "
        "Jokargy Kenesem Republiki Karakalpakstanu."
    ))
    s.append(art("90",
        "Rada Ministrów Republiki Karakalpakstanu, na podstawie i w wykonaniu ustaw Republiki "
        "Uzbekistanu i innych decyzji Oliy Majlisu Republiki Uzbekistanu, dekretów, uchwał i "
        "zarządzeń Prezydenta Republiki Uzbekistanu, uchwał i zarządzeń Gabinetu Ministrów "
        "Republiki Uzbekistanu, ustaw Republiki Karakalpakstanu i innych decyzji Jokargy Kenesu "
        "Republiki Karakalpakstanu, uchwał Prezydium Jokargy Kenesu Republiki Karakalpakstanu, "
        "wydaje uchwały i zarządzenia obowiązujące na całym terytorium Republiki Karakalpakstanu."
    ))
    s.append(art("91",
        "Kompetencje Rady Ministrów Republiki Karakalpakstanu, tryb jej działalności oraz relacje "
        "Rady Ministrów z innymi organami państwowymi Republiki Karakalpakstanu określa ustawa "
        "Republiki Karakalpakstanu."
    ))

    s.append(chapter("ROZDZIAŁ XXI.\nPODSTAWY WŁADZY PAŃSTWOWEJ NA POZIOMIE LOKALNYM"))
    s.append(art("92",
        "Organami przedstawicielskimi w rejonach i miastach (z wyjątkiem miast podporządkowanych "
        "rejonowi) są Rady Deputowanych Ludowych, którym przewodniczą hakimowie. Działając w "
        "interesie państwa i obywateli, rozwiązują oni kwestie należące do ich kompetencji."
    ))
    s.append(art("93",
        "Do kompetencji lokalnych organów władzy należą:\n"
        "– zapewnienie legalności, porządku publicznego i bezpieczeństwa obywateli;\n"
        "– kwestie rozwoju gospodarczego, społecznego i kulturalnego terytoriów;\n"
        "– tworzenie i wykonywanie lokalnego budżetu, ustalanie lokalnych podatków i opłat, "
        "tworzenie funduszy pozabudżetowych;\n"
        "– zarządzanie lokalną gospodarką komunalną;\n"
        "– ochrona środowiska;\n"
        "– zapewnienie rejestracji aktów stanu cywilnego;\n"
        "– przyjmowanie aktów normatywnych oraz inne uprawnienia, które nie są sprzeczne z "
        "Konstytucją i ustawodawstwem Republiki Karakalpakstanu."
    ))
    s.append(art("94",
        "Lokalne organy władzy wdrażają ustawy Republiki Uzbekistanu i inne decyzje Oliy Majlisu "
        "Republiki Uzbekistanu, dekrety, uchwały i zarządzenia Prezydenta Republiki Uzbekistanu, "
        "uchwały i zarządzenia Gabinetu Ministrów Republiki Uzbekistanu, ustawy Republiki "
        "Karakalpakstanu i inne decyzje Jokargy Kenesu Republiki Karakalpakstanu, uchwały "
        "Prezydium Jokargy Kenesu Republiki Karakalpakstanu, uchwały i zarządzenia Rady Ministrów "
        "Republiki Karakalpakstanu, a także uczestniczą w omawianiu kwestii o znaczeniu "
        "republikańskim i lokalnym.\n"
        "Decyzje organów wyższego szczebla, podjęte w granicach ich kompetencji, są obowiązkowe "
        "dla organów niższego szczebla.\n"
        "Kadencja Rad Deputowanych Ludowych i hakimów wynosi 5 lat."
    ))
    s.append(art("95",
        "Władzę przedstawicielską i wykonawczą na danym terytorium sprawuje hakim rejonu lub "
        "miasta."
    ))
    s.append(art("96",
        "Hakimowie rejonów i miast oraz ich zastępcy są powoływani i odwoływani na wniosek "
        "Przewodniczącego Rady Ministrów Republiki Karakalpakstanu przez Przewodniczącego "
        "Jokargy Kenesu Republiki Karakalpakstanu i zatwierdzani przez właściwą Radę "
        "Deputowanych Ludowych."
    ))
    s.append(art("97",
        "Hakim rejonu lub miasta wykonuje swoje uprawnienia na zasadzie jednoosobowego "
        "kierownictwa i ponosi osobistą odpowiedzialność za decyzje i działania kierowanych "
        "przez siebie organów.\n"
        "Hakim przedstawia właściwej Radzie Deputowanych Ludowych sprawozdania dotyczące "
        "najważniejszych i aktualnych kwestii społeczno‑gospodarczego rozwoju rejonu lub miasta, "
        "na podstawie których Rada podejmuje odpowiednie decyzje.\n"
        "Organizacja działalności, zakres uprawnień hakimów oraz lokalnych Rad Deputowanych "
        "Ludowych, a także tryb wyborów lokalnych Rad Deputowanych Ludowych określa ustawa."
    ))
    s.append(art("98",
        "Hakim, w granicach przysługujących mu uprawnień, wydaje decyzje obowiązujące wszystkie "
        "przedsiębiorstwa, instytucje, organizacje, zrzeszenia, a także urzędników i obywateli "
        "na danym terytorium."
    ))
    s.append(art("99",
        "Organami samorządu w osiedlach, aulach oraz mahallach miast są zgromadzenia obywateli, "
        "które wybierają przewodniczącego (aksakała).\n"
        "Tryb wyborów, organizacja działalności i zakres uprawnień organów samorządu określa "
        "ustawa."
    ))

    s.append(chapter("ROZDZIAŁ XXII.\nWŁADZA SĄDOWNICZA REPUBLIKI KARAKALPAKSTANU"))
    s.append(art("100",
        "Władza sądownicza w Republice Karakalpakstanu działa niezależnie od władzy "
        "ustawodawczej i wykonawczej, partii politycznych oraz innych organizacji społecznych."
    ))
    s.append(art("101",
        "System sądowniczy Republiki Karakalpakstanu obejmuje:\n"
        "– Sąd Republiki Karakalpakstanu,\n"
        "– Administracyjny Sąd Republiki Karakalpakstanu,\n"
        "– sądy międzyrejonowe i rejonowe (miejskie) ds. cywilnych,\n"
        "– sądy rejonowe i miejskie ds. karnych,\n"
        "– międzyrejonowe sądy gospodarcze,\n"
        "– międzyrejonowe sądy administracyjne.\n"
        "Organizacja i tryb działalności sądów określane są ustawą.\n"
        "Tworzenie sądów nadzwyczajnych jest niedopuszczalne."
    ))
    s.append(art("102",
        "Sąd Republiki Karakalpakstanu jest najwyższym organem władzy sądowniczej w zakresie "
        "postępowania cywilnego, karnego i gospodarczego."
    ))

    # Artykuly 103 i 104 — WYKLUCZONE na czerwono
    s.append(art_excluded("103"))
    s.append(art_excluded("104"))

    s.append(art("105",
        "Administracyjny Sąd Republiki Karakalpakstanu jest najwyższym organem władzy sądowniczej "
        "w zakresie rozpatrywania sporów administracyjnych wynikających ze skarg i wniosków "
        "powstałych na tle stosunków publicznoprawnych oraz posiada prawo kontroli działalności "
        "sądowej międzyrejonowych sądów administracyjnych."
    ))
    s.append(art("106",
        "Sędziowie są niezależni i podlegają jedynie ustawie. Jakakolwiek ingerencja w działalność "
        "sędziów przy sprawowaniu wymiaru sprawiedliwości jest niedopuszczalna i pociąga za sobą "
        "odpowiedzialność przewidzianą prawem.\n"
        "Nietykalność sędziów jest gwarantowana ustawą.\n"
        "Sędziowie nie mogą być senatorami ani deputowanymi organów przedstawicielskich władzy "
        "państwowej.\n"
        "Sędziowie nie mogą być członkami partii politycznych, uczestniczyć w ruchach "
        "politycznych ani zajmować żadnego innego płatnego stanowiska poza działalnością naukową "
        "i dydaktyczną.\n"
        "Przed upływem kadencji sędzia może zostać odwołany ze stanowiska jedynie na podstawach "
        "określonych w ustawie."
    ))
    s.append(art("107",
        "Rozpoznawanie spraw we wszystkich sądach jest jawne. Rozpatrywanie spraw na posiedzeniu "
        "zamkniętym dopuszcza się jedynie w przypadkach przewidzianych ustawą."
    ))
    s.append(art("108",
        "Akty władzy sądowniczej są obowiązujące dla wszystkich organów państwowych, organizacji "
        "społecznych, przedsiębiorstw, instytucji, organizacji, urzędników oraz obywateli."
    ))
    s.append(art("109",
        "Postępowanie sądowe w Republice Karakalpakstanu prowadzi się w języku karakałpackim, "
        "uzbeckim lub w języku większości ludności danej miejscowości. Osobom uczestniczącym w "
        "sprawie, które nie znają języka postępowania, zapewnia się prawo pełnego zapoznania się "
        "z materiałami sprawy, udziału w czynnościach sądowych za pośrednictwem tłumacza oraz "
        "prawo występowania w sądzie w swoim języku ojczystym.."
    ))
    s.append(art("110",
        "Oskarżonemu zapewnia się prawo do obrony. Prawo do profesjonalnej pomocy prawnej jest "
        "gwarantowane na każdym etapie postępowania przygotowawczego i sądowego.\n"
        "W celu udzielania pomocy prawnej obywatelom, przedsiębiorstwom, organizacjom i "
        "instytucjom działa adwokatura. Organizacja i tryb działalności adwokatury określane są "
        "ustawą."
    ))

    s.append(chapter("ROZDZIAŁ XXIII.\nSYSTEM WYBORCZY"))
    s.append(art("111",
        "Obywatele Republiki Karakalpakstanu mają prawo wybierać i być wybierani do organów "
        "przedstawicielskich. Każdy wyborca dysponuje jednym głosem. Prawo głosu, równość i "
        "swoboda wyrażania woli są gwarantowane ustawą.\n"
        "Wybory do Jokargy Kenesu Republiki Karakalpakstanu oraz do przedstawicielskich organów "
        "władzy rejonów i miast przeprowadza się w roku upływu ich konstytucyjnej kadencji — w "
        "pierwszą niedzielę trzeciej dekady października. Wybory odbywają się na podstawie "
        "powszechnego, równego i bezpośredniego prawa wyborczego, w głosowaniu tajnym. Prawo "
        "wybierania mają obywatele Republiki Karakalpakstanu, którzy ukończyli 18 lat.\n"
        "Nie mogą być wybierane osoby uznane przez sąd za niezdolne do czynności prawnych, a "
        "także osoby odbywające karę pozbawienia wolności na podstawie wyroku sądu.\n"
        "W wyborach nie uczestniczą osoby uznane przez sąd za niezdolne do czynności prawnych "
        "oraz osoby odbywające karę pozbawienia wolności za ciężkie i szczególnie ciężkie "
        "przestępstwa. W innych przypadkach jakiekolwiek bezpośrednie lub pośrednie ograniczenie "
        "praw wyborczych obywateli jest niedopuszczalne.\n"
        "Obywatel Republiki Karakalpakstanu nie może jednocześnie być deputowanym więcej niż w "
        "dwóch przedstawicielskich organach władzy państwowej.\n"
        "W celu organizacji i przeprowadzenia wyborów do Jokargy Kenesu Republiki "
        "Karakalpakstanu oraz referendum Republiki Karakalpakstanu, Jokargy Kenes powołuje "
        "Centralną Komisję Wyborczą Republiki Karakalpakstanu, której podstawowymi zasadamii "
        "działalności są: niezależność, legalność, kolegialność, jawność i sprawiedliwość.\n"
        "Centralna Komisja Wyborcza Republiki Karakalpakstanu działa na stałej podstawie i "
        "kieruje się w swojej działalności Konstytucją Republiki Karakalpakstanu, ustawami o "
        "wyborach i referendum Republiki Karakalpakstanu oraz innymi aktami prawnymi.\n"
        "Członkowie Centralnej Komisji Wyborczej Republiki Karakalpakstanu są wybierani przez "
        "Jokargy Kenes Republiki Karakalpakstanu na podstawie rekomendacji rejonowych i "
        "miejskich Kengaszów Deputowanych Ludowych.\n"
        "Przewodniczący Centralnej Komisji Wyborczej Republiki Karakalpakstanu jest wybierany "
        "spośród jej członków na posiedzeniu komisji, na wniosek Przewodniczącego Jokargy Kenesu "
        "Republiki Karakalpakstanu\n"
        "Tryb przeprowadzania wyborów określa ustawa."
    ))

    s.append(chapter("ROZDZIAŁ XXIV.\nNADZÓR KONSTYTUCYJNY"))
    s.append(art("112",
        "Nadzór konstytucyjny w Republice Karakałpakstanu sprawuje Komitet Nadzoru "
        "Konstytucyjnego Republiki Karakałpakstanu.\n"
        "Komitet Nadzoru Konstytucyjnego Republiki Karakałpakstanu jest wybierany przez Jokargy "
        "Kenes Republiki Karakałpakstanu spośród specjalistów w dziedzinie polityki i prawa, w "
        "składzie: przewodniczący, zastępca przewodniczącego oraz członkowie Komitetu. Kadencja "
        "osób wybranych do Komitetu Nadzoru Konstytucyjnego Republiki Karakałpakstanu trwa pięć "
        "lat.\n"
        "Pełnienie obowiązków przewodniczącego, zastępcy przewodniczącego oraz członków Komitetu "
        "Nadzoru Konstytucyjnego Republiki Karakałpakstanu jest niepołączalne z mandatem "
        "deputowanego.\n"
        "Osoby wybrane do Komitetu Nadzoru Konstytucyjnego Republiki Karakałpakstanu nie mogą "
        "jednocześnie wchodzić w skład organów, których akty podlegają nadzorowi Komitetu.\n"
        "Osoby wybrane do Komitetu Nadzoru Konstytucyjnego Republiki Karakałpakstanu są "
        "niezawisłe w wykonywaniu swoich obowiązków i podlegają wyłącznie Konstytucji Republiki "
        "Karakalpakstanu."
    ))
    s.append(art("113",
        "Komitet Nadzoru Konstytucyjnego Republiki Karakałpakstanu:\n"
        "1) na zlecenie Dżokargy Kenesu Republiki Karakałpakstanu przedkłada mu opinie o zgodności "
        "projektów ustaw Republiki Karakałpakstanu oraz innych aktów wnoszonych pod obrady "
        "Jokargy Kenesu Republiki Karakałpakstanu z Konstytucją Republiki Karakałpakstanu;\n"
        "2) na wniosek co najmniej jednej piątej posłów Rady Najwyższej (Jokargy Kenes) Republiki "
        "Karakałpacji lub Przewodniczącego Rady Najwyższej Republiki Karakałpacji przedkłada Radzie "
        "Najwyższej Republiki Karakałpacji wnioski w sprawie zgodności ustaw Republiki Karakałpacji oraz "
        "innych aktów przyjętych przez Radę Najwyższą Republiki Karakałpacji z Konstytucją Republiki Karakałpacji;\n"
        "3) na zlecenie Jokargy Kenesu Republiki Karakałpakstanu przedkłada mu opinie o zgodności "
        "uchwał Prezydium oraz zarządzeń Przewodniczącego Jokargy Kenesu Republiki "
        "Karakałpakstanu z Konstytucją i ustawami Republiki Karakałpakstanu;\n"
        "4) na zlecenie Jokargy Kenesu Republiki Karakałpakstanu, na wniosek co najmniej jednej piątej "
        "deputowanych Jokargy Kenesu Republiki Karakałpakstanu lub Przewodniczącego Jokargy Kenesu Republiki "
        "Karakałpakstanu przedkłada Jokargy Kenesowi Republiki Karakałpakstanu opinię o zgodności uchwał i "
        "zarządzeń Rady Ministrów Republiki Karakałpakstanu z Konstytucją i ustawami Republiki Karakałpakstanu;\n"
        "Komitet Nadzoru Konstytucyjnego Republiki Karakałpakstanu jest uprawniony także z "
        "własnej inicjatywy do przedkładania opinii o zgodności aktów najwyższych organów władzy "
        "państwowej i administracji Republiki Karakałpakstanu z Konstytucją i ustawami Republiki "
        "Karakałpakstanu.\n"
        "Opinia Komitetu może zostać odrzucona jedynie decyzją Jokargy Kenesu Republiki "
        "Karakałpakstanu, podjętą większością dwóch trzecich głosów ogólnej liczby deputowanych "
        "Jokargy Kenesu Republiki Karakałpakstanu.\n"
        "Organizację i tryb działania Komitetu Nadzoru Konstytucyjnego Republiki Karakałpakstanu "
        "określa Ustawa Republiki Karakałpakstanu o Nadzorze Konstytucyjnym."
    ))

    s.append(chapter("ROZDZIAŁ XXV.\nPROKURATURA"))
    s.append(art("114",
        "Nadzór nad ścisłym i jednolitym wykonywaniem ustaw na terytorium Republiki "
        "Karakałpakstanu sprawują Prokurator Republiki Karakałpakstanu oraz podlegli mu "
        "prokuratorzy."
    ))
    s.append(art("115",
        "Prokurator Republiki Karakałpakstanu jest mianowany i odwoływany przez Jokargy Kenes "
        "Republiki Karakałpakstanu w porozumieniu z Prokuratorem Generalnym Republiki "
        "Uzbekistanu.\n"
        "Prokuratorzy rejonowi i miejscy są mianowani i odwoływani przez Prokuratora Generalnego "
        "Republiki Uzbekistanu na wniosek Prokuratora Republiki Karakałpakstanu.\n"
        "Kadencja Prokuratora Republiki Karakałpakstanu oraz prokuratorów rejonowych i miejskich "
        "trwa pięć lat."
    ))
    s.append(art("116",
        "Organy prokuratury Republiki Karakałpacji wykonują swoje uprawnienia niezależnie od "
        "jakichkolwiek organów państwowych, stowarzyszeń społecznych i osób urzędowych, "
        "podlegając wyłącznie ustawie.\n"
        "Prokuratorzy w okresie sprawowania swoich funkcji zawieszają członkostwo w partiach "
        "politycznych i innych stowarzyszeniach społecznych dążących do celów politycznych.\n"
        "Organizację, uprawnienia oraz tryb działania organów prokuratury określa ustawa."
    ))
    s.append(art("117",
        "Na terytorium Republiki Karakałpacji zabrania się tworzenia i funkcjonowania "
        "prywatnych, spółdzielczych organizacji, stowarzyszeń społecznych oraz ich jednostek "
        "strukturalnych, samodzielnie wykonujących czynności operacyjno-rozpoznawcze, śledcze "
        "oraz inne funkcje specjalne w zakresie zwalczania przestępczości.\n"
        "W ochronie praworządności i porządku publicznego, praw i wolności obywateli, organom "
        "ścigania mogą udzielać pomocy stowarzyszenia społeczne oraz obywatele."
    ))

    s.append(chapter("ROZDZIAŁ XXVI.\nFINANSE I BUDŻET"))
    s.append(art("118",
        "Budżet państwowy Republiki Karakałpacji obejmuje budżet republikański oraz budżety "
        "lokalne."
    ))
    s.append(art("119",
        "Podział dochodów i wydatków budżetu państwowego Republiki Karakałpacji między budżet "
        "republikański a budżety lokalne określają przepisy ustawodawstwa Republiki "
        "Karakałpacji."
    ))

    # CZĘŚĆ SZÓSTA
    s.append(PageBreak())
    s.append(section("CZĘŚĆ SZÓSTY.\nTRYB ZMIANY KONSTYTUCJI"))
    s.append(hr_blue())

    s.append(art("120",
        "Zmiany w Konstytucji Republiki Karakałpacji wprowadza się w drodze ustaw przyjętych "
        "większością co najmniej dwóch trzecich głosów ogólnej liczby deputowanych Rady Najwyższej "
        "(Jokargy Kenes) lub w drodze referendum Republiki Karakałpacji."
    ))
    s.append(art("121",
        "Rada Najwyższa (Jokargy Kenes) Republiki Karakałpacji jest uprawniona do uchwalenia ustawy o zmianach "
        "i poprawkach do Konstytucji w terminie sześciu miesięcy od przedłożenia stosownego "
        "wniosku. Jeżeli Rada Najwyższa Republiki Karakałpacji odrzuciła wniosek o zmianę "
        "Konstytucji, może on zostać ponowiony nie wcześniej niż po upływie roku."
    ))

    # Strona koncowa
    s.append(PageBreak())
    s.append(Spacer(1, 3*cm))
    s.append(HRFlowable(width="60%", thickness=2, color=GOLD,
                        hAlign='CENTER', spaceAfter=20))
    s.append(Paragraph(
        "KONSTYTUCJA REPUBLIKI KARAKALPAKSTANU",
        S['cover_republic']
    ))
    s.append(Paragraph(
        "Przyjeta 9 kwietnia 1993 roku · Wydanie obowiazujace",
        S['cover_adopted']
    ))
    s.append(Spacer(1, 0.5*cm))
    s.append(Paragraph("www.karakalpakvoice.org", S['cover_site']))
    s.append(Paragraph(
        "Karakalpakstan — republika suwerenna · Dokument archiwalny · " + YEAR,
        S['cover_site']
    ))
    s.append(HRFlowable(width="60%", thickness=2, color=GOLD,
                        hAlign='CENTER', spaceBefore=20))
    return s

# — Generowanie PDF ———————————————————————————————————————————————————
def build_pdf(output_path="constitution_2026_pl.pdf"):
    doc = BaseDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
        title=f"Konstytucja Republiki Karakalpakstanu {YEAR}",
        author="www.karakalpakvoice.org",
        subject="Konstytucja Republiki Karakalpakstanu",
        creator="www.karakalpakvoice.org"
    )
    doc.addPageTemplates([make_page_template(doc)])

    story = []
    story += build_cover()
    story += build_content()

    doc.build(story)
    print(f"✅ PDF wygenerowany: {output_path}")

if __name__ == "__main__":
    build_pdf()