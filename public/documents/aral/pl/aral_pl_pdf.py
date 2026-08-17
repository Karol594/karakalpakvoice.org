# -*- coding: utf-8 -*-
"""
ARAL — Apel do społeczności międzynarodowej (PL)
PDF generator — "2026 design" (karakalpakvoice.org)
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, Frame, PageTemplate,
                                Paragraph, Spacer, HRFlowable, Image, PageBreak)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# -- Fonts --------------------------------------------------------------------
pdfmetrics.registerFont(TTFont('DejaVu',      'C:/Windows/Fonts/times.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuBold',  'C:/Windows/Fonts/timesbd.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuIt',    'C:/Windows/Fonts/timesi.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans',  'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSansB', 'C:/Windows/Fonts/arialbd.ttf'))

PAGE_W, PAGE_H = A4
MARGIN    = 2.5 * cm
ARAL_HIST = os.path.join(SCRIPT_DIR, "aralhistori.jpg")
OUTPUT    = os.path.join(SCRIPT_DIR, "aral_pl.pdf")
SITE_URL  = "https://www.karakalpakvoice.org"
SITE_TXT  = "www.karakalpakvoice.org"
DOC_DATE  = "3 czerwca 2026 r."

DARK_BLUE  = colors.HexColor('#0d2b4e')
MID_BLUE   = colors.HexColor('#1a4a7a')
LIGHT_BLUE = colors.HexColor('#2c6fad')
GOLD       = colors.HexColor('#b8860b')
GRAY       = colors.HexColor('#555555')
LIGHT_GRAY = colors.HexColor('#cccccc')
LINK_COLOR = colors.HexColor('#1a4a7a')
LINK_HEX   = '#1a4a7a'

# -- Styles -------------------------------------------------------------------
def make_styles():
    return {
        'cover_org': ParagraphStyle('cover_org', fontName='DejaVuSansB', fontSize=10,
                                    textColor=GOLD, alignment=TA_CENTER, spaceAfter=2),
        'cover_title': ParagraphStyle('cover_title', fontName='DejaVuBold', fontSize=17,
                                      textColor=DARK_BLUE, alignment=TA_CENTER,
                                      leading=22, spaceBefore=16, spaceAfter=12),
        'cover_sub': ParagraphStyle('cover_sub', fontName='DejaVuBold', fontSize=13,
                                    textColor=MID_BLUE, alignment=TA_CENTER,
                                    leading=18, spaceAfter=10),
        'cover_addr': ParagraphStyle('cover_addr', fontName='DejaVuIt', fontSize=10.5,
                                     textColor=GRAY, alignment=TA_CENTER, leading=15),
        'cover_date': ParagraphStyle('cover_date', fontName='DejaVuSansB', fontSize=10,
                                     textColor=DARK_BLUE, alignment=TA_CENTER, spaceBefore=4),
        'section': ParagraphStyle('section', fontName='DejaVuBold', fontSize=14,
                                  textColor=DARK_BLUE, alignment=TA_LEFT,
                                  leading=18, spaceBefore=16, spaceAfter=8),
        'body': ParagraphStyle('body', fontName='DejaVu', fontSize=11,
                               textColor=colors.black, alignment=TA_JUSTIFY,
                               leading=16, spaceAfter=8, firstLineIndent=14),
        'body_noindent': ParagraphStyle('body_noindent', fontName='DejaVu', fontSize=11,
                                        textColor=colors.black, alignment=TA_JUSTIFY,
                                        leading=16, spaceAfter=8),
        'quote': ParagraphStyle('quote', fontName='DejaVuIt', fontSize=11,
                                textColor=MID_BLUE, alignment=TA_JUSTIFY, leading=17,
                                leftIndent=24, rightIndent=18, spaceBefore=4, spaceAfter=10),
        'listitem': ParagraphStyle('listitem', fontName='DejaVu', fontSize=11,
                                   textColor=colors.black, alignment=TA_JUSTIFY,
                                   leading=16, spaceAfter=6, leftIndent=18,
                                   firstLineIndent=-12),
        'src_head': ParagraphStyle('src_head', fontName='DejaVuBold', fontSize=12,
                                   textColor=DARK_BLUE, alignment=TA_LEFT,
                                   spaceBefore=14, spaceAfter=8),
        'src': ParagraphStyle('src', fontName='DejaVu', fontSize=9, textColor=GRAY,
                              alignment=TA_LEFT, leading=12.5, spaceAfter=3, leftIndent=12,
                              firstLineIndent=-12),
    }

# -- Header / Footer (każda strona) ------------------------------------------
def draw_decorations(canvas, doc):
    canvas.saveState()
    top_y = PAGE_H - 1.5 * cm
    canvas.setStrokeColor(GOLD); canvas.setLineWidth(0.8)
    canvas.line(MARGIN, top_y, PAGE_W - MARGIN, top_y)
    canvas.setFont('DejaVuSansB', 8.5); canvas.setFillColor(LINK_COLOR)
    hx = MARGIN; hy = top_y + 5
    canvas.drawString(hx, hy, SITE_TXT)
    hw = canvas.stringWidth(SITE_TXT, 'DejaVuSansB', 8.5)
    canvas.linkURL(SITE_URL, (hx, hy - 2, hx + hw, hy + 9), relative=0)
    canvas.setFont('DejaVuSans', 8); canvas.setFillColor(GRAY)
    canvas.drawRightString(PAGE_W - MARGIN, hy, "KATASTROFA EKOLOGICZNA MORZA ARALSKIEGO")

    bot_y = 1.6 * cm
    canvas.setStrokeColor(GOLD); canvas.setLineWidth(0.8)
    canvas.line(MARGIN, bot_y, PAGE_W - MARGIN, bot_y)
    fy = 1.05 * cm
    canvas.setFont('DejaVuSansB', 9); canvas.setFillColor(DARK_BLUE)
    fw = canvas.stringWidth(SITE_TXT, 'DejaVuSansB', 9)
    fx = (PAGE_W - fw) / 2.0
    canvas.drawString(fx, fy, SITE_TXT)
    canvas.linkURL(SITE_URL, (fx, fy - 2, fx + fw, fy + 9), relative=0)
    canvas.setFont('DejaVuSans', 8); canvas.setFillColor(GRAY)
    canvas.drawString(MARGIN, fy, "Naród Karakałpacki")
    canvas.drawRightString(PAGE_W - MARGIN, fy, str(doc.page))
    canvas.restoreState()

# -- Helpers ------------------------------------------------------------------
S = make_styles()
def P(t, key='body'):  return Paragraph(t, S[key])
def gap(h):            return Spacer(1, h)
def rule(color=GOLD, w=1.0):
    return HRFlowable(width="100%", thickness=w, color=color,
                      spaceBefore=6, spaceAfter=10, lineCap='round')

def src_para(text, url):
    if url:
        inner = '<link href="%s" color="%s"><u>%s</u></link>' % (url, LINK_HEX, text)
    else:
        inner = text
    return Paragraph("&bull; " + inner, S['src'])

# -- Cover --------------------------------------------------------------------
def build_cover():
    s = []
    s.append(gap(0.8 * cm))
    s.append(P("karakalpakvoice.org", 'cover_org'))
    s.append(rule(GOLD, 1.2))
    s.append(P("KATASTROFA EKOLOGICZNA MORZA ARALSKIEGO<br/>"
               "ORAZ SYTUACJA HUMANITARNA NARODU KARAKAŁPACKIEGO", 'cover_title'))
    s.append(P("Apel do społeczności międzynarodowej", 'cover_sub'))
    s.append(gap(0.3 * cm))
    s.append(P("Do Organizacji Narodów Zjednoczonych (ONZ) oraz jej wyspecjalizowanych agencji;<br/>"
               "Do Organizacji Bezpieczeństwa i Współpracy w Europie (OBWE);<br/>"
               "Do Biura Wysokiego Komisarza Narodów Zjednoczonych ds. Praw Człowieka (OHCHR);<br/>"
               "Do misji dyplomatycznych;<br/>"
               "Do organizacji zajmujących się ochroną praw człowieka oraz niezależnych dziennikarzy.", 'cover_addr'))
    s.append(gap(0.6 * cm))
    if os.path.exists(ARAL_HIST):
        hist = Image(ARAL_HIST, width=13.0 * cm, height=10.4 * cm)
        hist.hAlign = 'CENTER'
        s.append(hist)
        s.append(gap(0.15 * cm))
        s.append(P("Morze Aralskie: 1977–2014 (zdjęcia satelitarne)", 'cover_addr'))
    else:
        print("UWAGA: aralhistori.jpg nie znaleziono - obraz pominięty.")
    s.append(gap(0.3 * cm))
    s.append(P(DOC_DATE, 'cover_date'))
    s.append(gap(0.3 * cm))
    s.append(rule(GOLD, 1.2))
    s.append(PageBreak())
    return s

# -- Body ---------------------------------------------------------------------
def build_body():
    s = []
    s.append(P("Streszczenie", 'section'))
    s.append(P("Wysychanie Morza Aralskiego jest jedną z najpoważniejszych katastrof "
               "ekologicznych spowodowanych działalnością człowieka w XX wieku. Wielu "
               "naukowców określa ją mianem „cichego Czarnobyla”. Największe konsekwencje "
               "tej tragedii ponosi przede wszystkim ludność Karakałpakstanu, licząca "
               "około dwóch milionów osób, zamieszkująca południową część regionu Morza "
               "Aralskiego."))
    s.append(P("Skutki tej katastrofy nie znają granic państwowych. Sól i toksyczny pył "
               "unoszące się z wyschniętego dna morza rozprzestrzeniają się na tysiące "
               "kilometrów, przyspieszając topnienie lodowców górskich w całym regionie. "
               "Jednocześnie badania naukowe potwierdziły, że utrata tak ogromnej masy "
               "wody wpłynęła również na głębokie procesy geologiczne Ziemi, "
               "przyczyniając się do przemieszczeń w obrębie płaszcza ziemskiego. Jest to "
               "problem o rzeczywiście globalnym, planetarnym znaczeniu."))
    s.append(P("Wszystkie informacje przedstawione w niniejszym apelu nie odnoszą się do "
               "hipotetycznych zagrożeń, lecz do mierzalnych i udokumentowanych zjawisk "
               "potwierdzonych przez międzynarodowe badania naukowe: powszechnego "
               "występowania anemii, epidemii gruźlicy, wysokiej śmiertelności niemowląt "
               "i matek, skażenia wody pitnej substancjami toksycznymi oraz utraty źródeł "
               "utrzymania przez miliony ludzi."))
    s.append(P("Wzywamy społeczność międzynarodową do zwrócenia szczególnej uwagi na ten "
               "kryzys humanitarny, do wsparcia niezależnego monitoringu ekologicznego i "
               "medycznego, do zapewnienia przejrzystego i odpowiedzialnego wykorzystania "
               "międzynarodowych środków przeznaczonych na działania związane z Morzem "
               "Aralskim, a także do udzielenia ukierunkowanej pomocy ludności dotkniętej "
               "skutkami tej katastrofy."))

    s.append(P("I. Skala katastrofy", 'section'))
    s.append(P("Morze Aralskie było niegdyś czwartym co do wielkości jeziorem na "
               "świecie, zajmującym około 68 000 km². Od lat 60., kiedy wody Amu-darii i "
               "Syr-darii zostały przekierowane na nawadnianie pól bawełny, morze zaczęło "
               "gwałtownie wysychać. Do 2007 roku utraciło około 90% swojej objętości, a "
               "jego powierzchnia zmniejszyła się do zaledwie około 10% stanu pierwotnego."))
    s.append(P("W miejscu morza powstała jedna z najmłodszych pustyń świata — pustynia "
               "Aralkum o powierzchni około 60 000 km². Od 1960 roku Morze Aralskie "
               "straciło ponad 1000 km³ wody."))

    s.append(P("II. Toksyczny pył: zagrożenie nieznające granic", 'section'))
    s.append(P("Osuszone dno morza stało się ogromnym rezerwuarem soli, osadów "
               "mineralnych, pestycydów i herbicydów, które przez dziesięciolecia "
               "spływały z pól bawełny. Dziś odsłonięta powierzchnia jest źródłem "
               "rozprzestrzeniania tych substancji chemicznych na okoliczne regiony."))
    s.append(P("Według ocen naukowych każdego roku z wyschniętego dna wiatry unoszą od "
               "15 do 75 milionów ton soli i toksycznych cząstek; niektóre szacunki "
               "wskazują nawet ponad 100 milionów ton rocznie. Jakość powietrza pogarsza "
               "się w promieniu do 800 kilometrów od źródła."))
    s.append(P("Ten pył nie jest zwykłym pyłem pustynnym. Badania wykazały wysokie "
               "stężenia DDT, arsenu, rtęci i innych toksycznych związków organochlorowych "
               "we krwi, moczu, a nawet mleku matek mieszkających w pobliżu dawnego "
               "wybrzeża."))
    s.append(P("Oddziaływanie tego pyłu wykracza daleko poza granice Karakałpakstanu. "
               "Badania i modelowania naukowe pokazują, że pył znad Aralu może "
               "przemieszczać się na setki i tysiące kilometrów — docierając do Gruzji, a "
               "nawet wybrzeży Arktyki; niektóre modele wskazują możliwość dotarcia aż na "
               "Grenlandię. Jeszcze poważniejsze jest to, że toksyczny pył osiadający na "
               "lodowcach, wraz ze zmineralizowanymi opadami, przyspiesza topnienie "
               "lodowców górskich zasilających Amu-darię i Syr-darię, co w przyszłości "
               "pogłębi deficyt wody."))

    s.append(P("III. Wpływ na zdrowie publiczne", 'section'))
    s.append(P("Humanitarny wymiar katastrofy jest najbardziej widoczny właśnie tutaj:"))
    s.append(P("<b>Niedokrwistość (anemia).</b> Zgodnie z badaniami opartymi na danych "
               "Światowej Organizacji Zdrowia (WHO), poziom anemii wśród kobiet i dzieci "
               "w Karakałpakstanie wynosi 80–90 procent — jest to jeden z najwyższych "
               "wskaźników na świecie. W niektórych badaniach odnotowano nawet 99 procent "
               "wśród kobiet w ciąży.", 'body_noindent'))
    s.append(P("<b>Gruźlica.</b> WHO określa próg epidemii na poziomie 50–70 przypadków "
               "na 100 000 osób; w Karakałpakstanie wskaźnik ten wynosi około 220. Region "
               "należy również do obszarów o najwyższych na świecie poziomach gruźlicy "
               "lekoopornej (MDR-TB).", 'body_noindent'))
    s.append(P("<b>Śmiertelność niemowląt i matek.</b> Dane naukowe wskazują, że "
               "śmiertelność niemowląt w Karakałpakstanie wynosi 60–110 zgonów na 1000 "
               "urodzeń żywych — znacznie powyżej średniej dla Uzbekistanu (≈48) i Rosji "
               "(≈24).", 'body_noindent'))
    s.append(P("<b>Choroby układu oddechowego, nowotwory i wady wrodzone.</b> Z powodu "
               "toksycznego pyłu znacząco wzrosła liczba przypadków zapalenia oskrzeli, "
               "astmy, chorób nerek i wątroby, nowotworów oraz wad wrodzonych; ostre "
               "infekcje dróg oddechowych stanowią niemal połowę wszystkich zgonów wśród "
               "dzieci.", 'body_noindent'))

    s.append(P("IV. Społeczno-ekonomiczne konsekwencje", 'section'))
    s.append(P("Gospodarka rybacka, która niegdyś utrzymywała dziesiątki tysięcy ludzi, "
               "całkowicie się załamała; miasta portowe, takie jak Mojnak, znalazły się "
               "setki kilometrów od dawnej linii brzegowej. Według ocen ekspertów "
               "katastrofa zmusiła ponad 100 000 osób do opuszczenia swoich domów i "
               "wpłynęła na zdrowie ponad 5 milionów mieszkańców całego regionu. "
               "Pozostałe źródła wody zostały skażone chemikaliami rolniczymi, a jakość "
               "wody pitnej osiągnęła poziom krytyczny."))

    s.append(P("V. Planetarne i historyczne znaczenie katastrofy", 'section'))
    s.append(P("<b>Wpływ na płaszcz Ziemi.</b> Badanie opublikowane w 2025 roku w Nature "
               "Geoscience (Uniwersytet Pekiński, University of Southern California) "
               "wykazało, że w wyniku wyschnięcia Morza Aralskiego odsłonięte dno podnosi "
               "się o około 7 milimetrów rocznie w promieniu 500 kilometrów. Przyczyną "
               "jest „odbicie” skorupy ziemskiej po uwolnieniu jej od ciężaru ponad 1000 "
               "km³ wody. Autorzy podkreślają, że działalność człowieka może wpływać "
               "nawet na głęboką, wewnętrzną dynamikę Ziemi. Zjawisko to jednoznacznie "
               "potwierdza planetarną skalę katastrofy.", 'body_noindent'))
    s.append(P("<b>Dziedzictwo poligonu biochemicznego.</b> W latach 1942–1992 na wyspie "
               "Wozrożdienie (Barsakelmes) na Morzu Aralskim działał sowiecki poligon "
               "biochemiczny („Barkhan”, PNIL-52). Wraz z wysychaniem morza wyspa "
               "połączyła się z lądem, co stworzyło dodatkowe zagrożenie dla "
               "bezpieczeństwa ekologicznego regionu.", 'body_noindent'))

    s.append(P("VI. Polityka wodna Uzbekistanu: transgraniczne szkody i możliwa celowa "
               "strategia", 'section'))
    s.append(P("<b>Sztuczne blokowanie Amu-darii.</b> Międzynarodowy monitoring naukowy "
               "oraz dane lokalne wskazują, że Uzbekistan celowo ogranicza przepływ "
               "Amu-darii, uniemożliwiając dopływ wody do Morza Aralskiego. Eksperci "
               "rozważają dwa możliwe motywy:", 'body_noindent'))
    s.append(P("1. Osuszenie morza w celu ułatwienia wydobycia zasobów naturalnych "
               "(gazu, rud, minerałów) z jego odsłoniętego dna. Badania naukowe sugerują "
               "możliwość istnienia znacznych zasobów pod pustynią Aralkum.", 'listitem'))
    s.append(P("2. Wywołanie niedoboru wody dla ludności Karakałpakstanu, zmuszenie jej "
               "do migracji i tym samym przejęcie ziemi oraz zasobów przez Uzbekistan. "
               "Jako dowód tej polityki wskazuje się próbę zniesienia suwerennego statusu "
               "Karakałpakstanu w 2022 roku.", 'listitem'))
    s.append(P("<b>Problem przejrzystości zbiorników wodnych.</b> Według oficjalnych "
               "danych Uzbekistan posiada 70 sztucznych zbiorników wodnych (dokumentacja "
               "UNFCCC). Jednak lokalne szacunki wskazują, że rzeczywista liczba "
               "przekracza 140–150. Wiele z tych zbiorników nie jest widocznych na mapach "
               "Google, co oznacza, że funkcjonują niejawnie. W takiej sytuacji konieczne "
               "jest powołanie wiarygodnej komisji ONZ, która przeprowadzi dokładną "
               "inspekcję na miejscu.", 'body_noindent'))

    s.append(P("VII. Międzynarodowo-prawne podstawy", 'section'))
    s.append(P("Kwestia ta jest już obecnie uznana na poziomie międzynarodowym i nie "
               "może być traktowana wyłącznie jako sprawa wewnętrzna:"))
    s.append(P("1. 18 maja 2021 roku Zgromadzenie Ogólne ONZ jednogłośnie przyjęło "
               "rezolucję A/RES/75/278, ogłaszając region Aralski strefą innowacji i "
               "technologii ekologicznych.", 'listitem'))
    s.append(P("2. W 1993 roku państwa regionu utworzyły Międzynarodowy Fundusz "
               "Ocalenia Morza Aralskiego (IFAS); w systemie ONZ działa Wielostronny "
               "Fundusz Powierniczy na rzecz Regionu Aralskiego (Multi-Partner Trust "
               "Fund).", 'listitem'))
    s.append(P("3. 28 lipca 2022 roku Zgromadzenie Ogólne ONZ rezolucją A/RES/76/300 "
               "uznało prawo do czystego, zdrowego i zrównoważonego środowiska za "
               "powszechne prawo człowieka. Sytuacja w regionie Aralskim bezpośrednio "
               "dotyczy tego prawa.", 'listitem'))
    s.append(P("Nie jest to wyłącznie sprawa wewnętrzna Uzbekistanu. Po pierwsze, "
               "rozprzestrzenianie się pyłu i substancji toksycznych przekracza granice i "
               "oddziałuje na kilka państw (transgraniczna szkoda ekologiczna). Po "
               "drugie, prawa człowieka — w tym prawo do zdrowia i bezpiecznego "
               "środowiska — nie mogą być wyłączone spod międzynarodowego nadzoru jako "
               "„sprawa wewnętrzna”. Z tych dwóch powodów kryzys Aralski jest kwestią, "
               "która zgodnie z prawem powinna pozostawać w centrum uwagi społeczności "
               "międzynarodowej."))

    s.append(P("VIII. Historyczno-prawne przypomnienie: przywrócenie statusu suwerennego "
               "Karakałpakstanu", 'section'))
    s.append(P("14 grudnia 1990 roku Rada Najwyższa Karakałpackiej ASRR (Uchwała nr "
               "82/XII, przewodnicząca T. Jeszimbetowa) przyjęła Deklarację o "
               "Suwerenności Państwowej. W jej preambule zapisano:"))
    s.append(P("„Kierując się troską o rozwój narodów oraz o rozwiązanie problemów "
               "ekologicznych wynikających z wysychania Morza Aralskiego, biorąc pod "
               "uwagę wyjątkowo niski poziom życia obywateli zamieszkujących strefę "
               "katastrofy ekologicznej…”", 'quote'))
    s.append(P("Deklaracja jest dokumentem historycznym, który określił "
               "polityczno-prawny status Karakałpakstanu. Ponadto sam Karakałpakstan jest "
               "w Konstytucji Uzbekistanu zapisany jako republika suwerenna."))
    s.append(P("<b>Propozycja dla społeczności międzynarodowej:</b> Przywrócić suwerenny "
               "status Karakałpakstanu, ustanowiony 14 grudnia 1990 roku, zgodnie z "
               "normami prawa międzynarodowego. Propozycja ta odpowiada współczesnej "
               "praktyce międzynarodowej, czego przykładem jest Łotwa. Może to stanowić "
               "właściwą podstawę prawną dla szybkiego i skutecznego rozwiązania jednego "
               "z największych globalnych kryzysów. Głos regionu, który poniósł "
               "największe szkody, musi zostać wysłuchany bezpośrednio.", 'body_noindent'))

    s.append(P("IX. Postulaty i rekomendacje", 'section'))
    s.append(P("Opierając się na powyższych faktach, zwracamy się do społeczności "
               "międzynarodowej z następującymi postulatami:"))
    reqs = [
        ("Niezależny monitoring.", "Ustanowienie niezależnego monitoringu sytuacji "
         "ekologicznej i zdrowia publicznego w Karakałpacji z udziałem międzynarodowych "
         "ekspertów; w razie konieczności – skierowanie misji technicznej Organizacji "
         "Narodów Zjednoczonych (ONZ)."),
        ("Weryfikacja zasobów wodnych.", "Powołanie przez ONZ wiarygodnej komisji w celu "
         "przeprowadzenia rzetelnego audytu rzeczywistej objętości i liczby zbiorników "
         "wodnych w Uzbekistanie. Konieczne jest zweryfikowanie informacji wskazujących "
         "na istnienie ponad 140–150 zbiorników, w przeciwieństwie do oficjalnie "
         "deklarowanych 70."),
        ("Przejrzystość i rozliczalność finansowa.", "Publikacja transparentnych, "
         "poddanych audytowi sprawozdań finansowych dotyczących dysponowania "
         "międzynarodowymi funduszami i grantami przeznaczonymi na rzecz regionu Morza "
         "Aralskiego; zapewnienie ścisłej kontroli nad tym, aby środki te trafiały "
         "bezpośrednio do poszkodowanej ludności."),
        ("Ukierunkowane programy humanitarne.", "Wsparcie celowych projektów w zakresie "
         "dostępu do czystej wody pitnej, leczenia gruźlicy i anemii oraz ochrony "
         "zdrowia matki i dziecka."),
        ("Włączenie społeczności lokalnej i wolność prasy.", "Włączenie przedstawicieli "
         "ludności lokalnej oraz niezależnych dziennikarzy w procesy decyzyjne; "
         "zapewnienie obserwatorom i mediom bezpiecznego oraz nieskrępowanego dostępu do "
         "regionu."),
        ("Stałe zaangażowanie.", "Utrzymanie międzynarodowego nadzoru nad kryzysem w "
         "sposób ciągły i długofalowy, unikając traktowania go wyłącznie jako problemu o "
         "charakterze tymczasowym."),
        ("Przywrócenie suwerennego statusu Karakałpacji.", "Przywrócenie suwerennego "
         "statusu Karakałpacji zgodnie z prawem międzynarodowym na podstawie Deklaracji z "
         "dnia 14 grudnia 1990 roku (analogicznie do przypadku Łotwy). Działanie to "
         "posłuży jako właściwa podstawa prawna do szybkiego i efektywnego rozwiązania "
         "problemu kryzysu aralskiego."),
    ]
    for i, (head, txt) in enumerate(reqs, 1):
        s.append(P("%d. <b>%s</b> %s" % (i, head, txt), 'listitem'))

    s.append(P("Wnioski", 'section'))
    s.append(P("Katastrofa Morza Aralskiego to nie tylko kwestia wyschniętego akwenu. To "
               "rzeczywistość milionów ludzi, którzy każdego dnia zmuszeni są żyć w "
               "obliczu chorób, zanieczyszczonej wody i powietrza oraz degradacji "
               "dotychczasowego trybu życia. Prawo tej ludności do zdrowia, czystej wody "
               "oraz bezpiecznego środowiska naturalnego stanowi fundament powszechnych "
               "praw człowieka."))
    s.append(P("Przedstawiamy powyższe fakty w oparciu o dowody oraz wiarygodne źródła, "
               "apelując do społeczności międzynarodowej o współpracę i pomoc."))
    s.append(P("<b>Naród Karakałpacji zasługuje na uwagę, prawdę oraz bezpieczną "
               "przyszłość.</b>", 'body_noindent'))

    # -- Źródła (z hiperłączami) --
    s.append(P("Źródła", 'src_head'))
    SOURCES = [
        ("Aral Sea tragedy: causes, impacts and possible solutions — Kun.uz, 2024.",
         "https://kun.uz/en/news/2024/08/01/aral-sea-tragedy-causes-impacts-and-possible-solutions"),
        ("Greening the Desert — World Bank, 2024 (Aralkum ≈ 60 000 km²).",
         "https://www.worldbank.org/en/news/feature/2024/12/04/greening-the-desert-the-role-of-landscape-restoration-in-uzbekistan-s-battle-against-sand-and-dust-storms"),
        ("Dust emission and environmental changes in the Aral Sea — Aeolian Research / ScienceDirect, 2015.",
         "https://www.sciencedirect.com/science/article/abs/pii/S1875963715000282"),
        ("Aralkum: world's newest desert — Atlas Obscura (NASA: &gt;100 mln ton pyłu solnego rocznie).",
         "https://www.atlasobscura.com/articles/aralkum-worlds-newest-desert"),
        ("What Is Happening to the Aral Sea — ScienceInsights, 2026 (DDT, arsen, rtęć we krwi/moczu/mleku matki).",
         "https://scienceinsights.org/what-is-happening-to-the-aral-sea-collapse-restoration/"),
        ("Dust emission and transport in the Aral Sea region — Geoderma / ScienceDirect, 2022 (transport do Gruzji, Arktyki; modelowanie — do Grenlandii).",
         "https://www.sciencedirect.com/science/article/pii/S0016706122004840"),
        ("Aral Sea — Columbia University / LDEO (toksyczny pył na lodowcach przyspieszający topnienie).",
         "https://www.ldeo.columbia.edu/~martins/hydro/case_studies/aral_sea.html"),
        ("Uzbekistan: Focus on health impact of Aral Sea crisis — IRIN / ReliefWeb (WHO: 80–90% anemia).",
         "https://reliefweb.int/report/uzbekistan/uzbekistan-focus-health-impact-aral-sea-crisis"),
        ("The Aral Sea Crisis — Columbia University (anemia do 99% u kobiet w ciąży).",
         "http://www.columbia.edu/~tmt2120/impacts%20to%20life%20in%20the%20region.htm"),
        ("The Aral Sea disappears while tuberculosis climbs — MSF (gruźlica ≈ 220/100 000).",
         "https://www.msf.org/aral-sea-disappears-while-tuberculosis-climbs"),
        ("Central Asia: Aral Sea crisis continues to erode health — ReliefWeb / MSF (MDR-TB).",
         "https://reliefweb.int/report/kazakhstan/central-asia-aral-sea-crisis-continues-erode-health"),
        ("The Aral Sea disaster and self-rated health — Health &amp; Place / ScienceDirect, 2002 (śmiertelność niemowląt 60–110/1000).",
         "https://www.sciencedirect.com/science/article/abs/pii/S1353829202000175"),
        ("The Aral Sea Crisis — Columbia University (&gt;100 000 przesiedlonych; &gt;5 mln dotkniętych).",
         "http://www.columbia.edu/~tmt2120/impacts%20to%20life%20in%20the%20region.htm"),
        ("Fan, W., Wang, T., Barbot, S., Luo, H. — Nature Geoscience, 2025. DOI: 10.1038/s41561-025-01664-w.",
         "https://doi.org/10.1038/s41561-025-01664-w"),
        ("Poligon biochemiczny „Barkhan” (PNIL-52) na wyspie Wozrożdienie — GlobalSecurity.org.",
         "https://www.globalsecurity.org/wmd/world/russia/vozrozhdenly.htm"),
        ("Rezolucja Zgromadzenia Ogólnego ONZ A/RES/75/278, 18.05.2021 — UN Digital Library; UNDP MPTF Office.",
         "https://digitallibrary.un.org/record/3928288"),
        ("Rezolucja Zgromadzenia Ogólnego ONZ A/RES/76/300, 28.07.2022 (prawo do czystego, zdrowego środowiska).",
         "https://digitallibrary.un.org/record/3983329"),
        ("„Deklaracja o Suwerenności Państwowej” — Rada Najwyższa Karakałpackiej ASRR, Uchwała nr 82/XII, 14.12.1990.",
         "https://karakalpakvoice.org/declaration"),
        ("Konstytucja Republiki Uzbekistanu — status Karakałpakstanu jako republiki suwerennej (Art. 85).",
         "https://constitution.uz/en/clause/index#section20"),
        ("Uzbekistan SAP Water — UNFCCC, 2023 (70 oficjalnych zbiorników wodnych).",
         "https://unfccc.int/sites/default/files/resource/Uzbekistan_SAP_Water_RUS.pdf"),
    ]
    for text, url in SOURCES:
        s.append(src_para(text, url))
    return s

# -- Build --------------------------------------------------------------------
def build():
    doc = BaseDocTemplate(
        OUTPUT, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=2.2 * cm, bottomMargin=2.2 * cm,
        title="Katastrofa ekologiczna Morza Aralskiego — Apel",
        author="karakalpakvoice.org",
    )
    frame = Frame(MARGIN, 2.0 * cm,
                  PAGE_W - 2 * MARGIN,
                  PAGE_H - 2.0 * cm - 2.4 * cm, id='main')
    doc.addPageTemplates([PageTemplate(id='all', frames=[frame],
                                        onPage=draw_decorations)])
    story = build_cover() + build_body()
    doc.build(story)
    print("PDF gotowy:", OUTPUT)

if __name__ == "__main__":
    build()