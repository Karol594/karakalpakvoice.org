# ============================================================
#  declaration_pl_pdf.py
#  Run: python declaration_pl_pdf.py
#  Run from: public\documents\declaration\1990\--pl\
# ============================================================
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    Paragraph, Spacer, HRFlowable,
    KeepTogether, PageBreak,
    BaseDocTemplate, Frame, PageTemplate, Image
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib import colors
import os
from datetime import datetime

# ── Шрифтлер (Windows) ───────────────────────────────────────
pdfmetrics.registerFont(TTFont('DejaVu',      'C:/Windows/Fonts/times.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuBold',  'C:/Windows/Fonts/timesbd.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuIt',    'C:/Windows/Fonts/timesi.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans',  'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSansB', 'C:/Windows/Fonts/arialbd.ttf'))

# ── Жолдар — скрипт + PDF + фото БІР ҚАЛТАДА (Constitution стілі)
# Орналасу: public\documents\declaration\1990\--kk\
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PHOTO    = os.path.join(SCRIPT_DIR, "..", "..", "resolution_1990.jpg")  # declaration\ ішінде
OUTPUT   = os.path.join(SCRIPT_DIR, "declaration_pl.pdf")   # сол қалтаға PDF
SITE_URL = "https://www.karakalpakvoice.org"
YEAR     = "1990"

print("📁 Қалта  :", SCRIPT_DIR)
print("🖼  Фото   :", PHOTO)
print("📄 PDF     :", OUTPUT)
print("🔍 Фото бар:", "✅ ИӘ" if os.path.exists(PHOTO) else "❌ ЖОҚ")

PAGE_W, PAGE_H = A4
MARGIN = 2.5 * cm

# ── Түстер (Конституция дизайнымен бірдей) ───────────────────
DARK_BLUE  = colors.HexColor('#0d2b4e')
MID_BLUE   = colors.HexColor('#1a4a7a')
LIGHT_BLUE = colors.HexColor('#2c6fad')
GOLD       = colors.HexColor('#b8860b')
GRAY       = colors.HexColor('#555555')
LIGHT_GRAY = colors.HexColor('#cccccc')
LINK_COLOR = colors.HexColor('#1a4a7a')

# ── Стильдер ──────────────────────────────────────────────────
def make_styles():
    return {
        # Фото беттегі жазыўлар
        'photo_title': ParagraphStyle(
            'photo_title', fontName='DejaVuBold', fontSize=22,
            textColor=DARK_BLUE, alignment=TA_CENTER,
            spaceAfter=6, leading=28),
        'photo_sub': ParagraphStyle(
            'photo_sub', fontName='DejaVuBold', fontSize=12,
            textColor=MID_BLUE, alignment=TA_CENTER,
            spaceAfter=4, leading=18),
        'photo_date': ParagraphStyle(
            'photo_date', fontName='DejaVu', fontSize=10,
            textColor=GRAY, alignment=TA_CENTER,
            spaceAfter=8, leading=14),
        # Декларация тексти
        'doc_main_title': ParagraphStyle(
            'doc_main_title', fontName='DejaVuBold', fontSize=18,
            textColor=DARK_BLUE, alignment=TA_CENTER,
            spaceBefore=12, spaceAfter=6, leading=26),
        'doc_sub_title': ParagraphStyle(
            'doc_sub_title', fontName='DejaVuBold', fontSize=13,
            textColor=MID_BLUE, alignment=TA_CENTER,
            spaceBefore=4, spaceAfter=12, leading=18),
        'preamble_label': ParagraphStyle(
            'preamble_label', fontName='DejaVuBold', fontSize=11,
            textColor=DARK_BLUE, alignment=TA_CENTER,
            spaceBefore=14, spaceAfter=6, leading=16),
        'preamble_text': ParagraphStyle(
            'preamble_text', fontName='DejaVu', fontSize=10,
            textColor=colors.black, alignment=TA_JUSTIFY,
            spaceAfter=10, leading=15),
        'article_title': ParagraphStyle(
            'article_title', fontName='DejaVuBold', fontSize=10,
            textColor=DARK_BLUE, alignment=TA_LEFT,
            spaceBefore=10, spaceAfter=3, leading=14),
        'article_text': ParagraphStyle(
            'article_text', fontName='DejaVu', fontSize=10,
            textColor=colors.black, alignment=TA_JUSTIFY,
            spaceAfter=6, leading=15),
        'footer_text': ParagraphStyle(
            'footer_text', fontName='DejaVuIt', fontSize=9.5,
            textColor=GRAY, alignment=TA_CENTER,
            spaceBefore=10, spaceAfter=4, leading=14),
        # Жалпы элементтер
        'cover_site': ParagraphStyle(
            'cover_site', fontName='DejaVuSans', fontSize=9,
            textColor=GRAY, alignment=TA_CENTER,
            spaceAfter=2, leading=12),
        'cover_link': ParagraphStyle(
            'cover_link', fontName='DejaVuSans', fontSize=9,
            textColor=LINK_COLOR, alignment=TA_CENTER,
            spaceAfter=2, leading=12),
        'closing_title': ParagraphStyle(
            'closing_title', fontName='DejaVuBold', fontSize=13,
            textColor=DARK_BLUE, alignment=TA_CENTER,
            spaceAfter=4, leading=18),
        'closing_sub': ParagraphStyle(
            'closing_sub', fontName='DejaVu', fontSize=10,
            textColor=MID_BLUE, alignment=TA_CENTER,
            spaceAfter=4, leading=14),
    }

S = make_styles()

# ── Колонтитул (Конституциямен бірдей стиль) ─────────────────
def make_page_template(doc):
    def header_footer(canvas, doc):
        # 1-бет = фото беті, колонтитул жоқ
        if doc.page == 1:
            return

        canvas.saveState()
        w, h = PAGE_W, PAGE_H

        # Жоғары сызық
        canvas.setStrokeColor(LIGHT_BLUE)
        canvas.setLineWidth(1.2)
        canvas.line(MARGIN, h - MARGIN + 0.4 * cm,
                    w - MARGIN, h - MARGIN + 0.4 * cm)

        # Жоғары мәтін
        canvas.setFont('DejaVuSans', 8)
        canvas.setFillColor(MID_BLUE)
        canvas.drawString(MARGIN, h - MARGIN + 0.6 * cm,
                          "DEKLARACJA · SUWERENNOSC PANSTWOWA")
        canvas.drawRightString(w - MARGIN, h - MARGIN + 0.6 * cm,
                               "1990 · 14 GRUDNIA")

        # Төменгі сызық
        canvas.setStrokeColor(LIGHT_BLUE)
        canvas.setLineWidth(0.8)
        canvas.line(MARGIN, MARGIN - 0.3 * cm,
                    w - MARGIN, MARGIN - 0.3 * cm)

        # Бет нөмірі
        canvas.setFont('DejaVuSans', 8)
        canvas.setFillColor(GRAY)
        canvas.drawCentredString(w / 2, MARGIN - 0.55 * cm, str(doc.page))

        # Интерактив сілтеме
        site_text = "www.karakalpakvoice.org"
        canvas.setFillColor(LINK_COLOR)
        text_width = canvas.stringWidth(site_text, 'DejaVuSans', 8)
        x_start = w - MARGIN - text_width
        y_pos   = MARGIN - 0.55 * cm
        canvas.drawString(x_start, y_pos, site_text)
        canvas.linkURL(SITE_URL,
                       (x_start, y_pos - 2,
                        x_start + text_width, y_pos + 8),
                       relative=0)
        canvas.restoreState()

    frame = Frame(
        MARGIN, MARGIN,
        PAGE_W - 2 * MARGIN, PAGE_H - 2 * MARGIN,
        id='main'
    )
    return PageTemplate(id='main', frames=[frame], onPage=header_footer)

# ── 1-БЕТ: Фото ──────────────────────────────────────────────
def build_photo_page():
    s = []
    s.append(Spacer(1, 0.3 * cm))

    if os.path.exists(PHOTO):
        # Фотоны бетке сыйдырыў (алтын жиек үшін орын қалдырамыз)
        img_w = PAGE_W - 2 * MARGIN
        img_h = PAGE_H - 2 * MARGIN - 4.5 * cm  # астыңғы мәтін үшін орын
        img = Image(PHOTO, width=img_w, height=img_h)
        img.hAlign = 'CENTER'
        s.append(img)
    else:
        # Фото табылмаса placeholder
        s.append(Spacer(1, 10 * cm))
        s.append(Paragraph(
            "[Zdjecie nie znalezione]<br/>"
            "Sciezka: " + PHOTO.replace('\\', '/'),
            S['footer_text']))

    s.append(Spacer(1, 0.4 * cm))
    s.append(HRFlowable(
        width="80%", thickness=2, color=GOLD,
        hAlign='CENTER', spaceAfter=8))

    s.append(Paragraph("DEKLARACJA", S['photo_title']))
    s.append(Paragraph(
        "o suwerenności państwowej Republiki Karakalpakstanu",
        S['photo_sub']))
    s.append(Paragraph(
        "14 grudnia 1990 roku · Nukus",
        S['photo_date']))

    s.append(HRFlowable(
        width="50%", thickness=1, color=LIGHT_GRAY,
        hAlign='CENTER', spaceAfter=6))
    s.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">'
        'www.karakalpakvoice.org</link>',
        S['cover_link']))
    s.append(Paragraph(
        "Karakalpakstan — Republika Suwerenna · Dokument archiwalny",
        S['cover_site']))

    s.append(PageBreak())
    return s

# ── Жәрдемші функциялар ───────────────────────────────────────
def art(num, text):
    """Статья блогы"""
    items = [Paragraph(str(num) + ".", S['article_title'])]
    for para in text.strip().split('\n'):
        para = para.strip()
        if para:
            items.append(Paragraph(para, S['article_text']))
    return KeepTogether(items)

def hr_gold():
    return HRFlowable(
        width="40%", thickness=1.5, color=GOLD,
        hAlign='CENTER', spaceBefore=4, spaceAfter=4)

def hr_blue():
    return HRFlowable(
        width="100%", thickness=0.5, color=LIGHT_BLUE,
        hAlign='CENTER', spaceBefore=6, spaceAfter=6)

# ── TRESC: Tekst Deklaracji (Polski) ─────────────────────────
def build_content():
    s = []

    # ── TYTUL ─────────────────────────────────────────────────
    s.append(Spacer(1, 0.4 * cm))
    s.append(Paragraph("DEKLARACJA", S['doc_main_title']))
    s.append(hr_gold())
    s.append(Paragraph(
        "o suwerenności państwowej Republiki Karakalpakstanu",
        S['doc_sub_title']))
    s.append(hr_blue())

    # ── PREAMBUŁA ─────────────────────────────────────────────
    s.append(Paragraph("P R E A M B U L A", S['preamble_label']))
    s.append(hr_gold())
    s.append(Paragraph(
        "Najwyższa Rada Karakalpakskiej Autonomicznej Socjalistycznej Republiki "
        "Radzieckiej: Czując historyczną odpowiedzialność za los wielonarodowego "
        "narodu Karakalpakstanu, swobodnie ją wyrażając, szanując suwerenne prawa "
        "wszystkich narodów ZSRR, opierając się na niezbywalnym prawie każdego narodu "
        "do samostanowienia, zwracając się do Najwyższej Rady Uzbeckiej SRR o ponowne "
        "rozpatrzenie wcześniej przyjętych aktów dotyczących Karakalpakskiej ASRR i "
        "sprzecznych z konstytucjami ZSRR, Uzbeckiej SRR i Karakalpakskiej ASRR, "
        " troszcząc się o polityczny, gospodarczy, społeczny i duchowy rozwój narodów, "
        "rozwiązanie problemów ekologicznych spowodowanych wysychaniem Morza Aralskiego, "
        "biorąc pod uwagę niezwykle niski poziom życia obywateli autonomicznej republiki "
        "żyjących w samym centrum katastrofy ekologicznej, Karakalpakstan ogłasza "
        "suwerenność państwową jako podmiot federacji ZSRR i przekształca ją w Suwerenną "
        "Republikę Karakalpakstanu.",
        S['preamble_text']))
    s.append(Paragraph(
        "Relacje między Republiką Karakalpakstanu, ZSRR i Uzbecką SRR opierają się "
        "na traktatach i umowach.",
        S['preamble_text']))

    s.append(hr_blue())

    # ── 12 ARTYKULOW ──────────────────────────────────────────
    s.append(art(1,
        "Republika Karakalpakstanu przejmuje pod swoją jurysdykcję wszystkie traktaty "
        "i umowy zawarte przez Radziecką Republikę Karakalpakstanu z ZSRR i Uzbecką "
        "SRR oraz deleguje wszystkie uprawnienia sobie. Buduje niezbędną strukturę "
        "administracji państwowej na wszystkich poziomach administracyjnych na swoim "
        "terytorium. Republika tworzy swoje okręgi administracyjne, ustanawia podziały "
        "gospodarczo-administracyjne oraz organy państwowe, takie jak sądy, arbitraż "
        "i nadzór prokuratorski, które działają wyłącznie niezależnie."))

    s.append(art(2,
        "Republika Karakalpakstanu prowadzi administrację państwową, uchwala ustawy "
        "i dekrety oraz powołuje organy sądowe sprawujące nadzór nad wykonaniem "
        "przyjętego ustawodawstwa.\n"
        "Najwyższa Rada Republiki Karakalpakstanu jest najwyższym organem administracji "
        "panstwowej.\n"
        "Rada Ministrów Republiki Karakalpakstanu jest najwyższym organem wykonawczym "
        "i zarządzającym.\n"
        "Najwyższy Sąd Republiki Karakalpakstanu jest najwyższym organem sądowym.\n"
        "Najwyższa Rada powołuje Prokuratora Generalnego sprawującego nadzór nad "
        "przestrzeganiem prawa i równością obywateli wobec prawa."))

    s.append(art(3,
        "Wielonarodowy naród Republiki Karakalpakstanu określa i konstytuuje Państwo "
        "na swoim suwerennym terytorium.\n"
        "Naród, opierając się na Konstytucji i ustawach, bezpośrednio i jednoznacznie "
        "poprzez wybranych deputowanych sprawuje władzę państwową. Rząd Republiki "
        "Karakalpakstanu umacnia przyjaźń narodów.\n"
        "Państwo zapewnia wszystkim obywatelom równe prawa i wolności, niezależnie "
        "od poglądów politycznych, wyznania czy innych różnic."))

    s.append(art(4,
        "Na terytorium Republiki Karakalpakstanu obowiązuje nadrzędność Konstytucji "
        "i ustaw.\n"
        "Jeśli prawa obywateli Republiki Karakalpakstanu są naruszane przez rządy ZSRR "
        "lub Uzbeckiej SRR, Republika ma prawo zawiesić wszystkie umowy "
        "międzypaństwowe i przedstawić im notę protestacyjną."))

    s.append(art(5,
        "Republika Karakalpakstanu chroni konstytucyjne prawa swoich obywateli, ich "
        "wolności, prawo do pracy, własności, organizuje życie społeczne, prowadzi "
        "rozwój społeczno-kulturalny i gospodarczy, działalność zagraniczną, tworzy "
        "wolne strefy ekonomiczne, zarządza systemem finansowo-budżetowym, określa "
        "podstawy wynagrodzeń i cen, prowadzi administrację podatkową, chroni swoje "
        "terytorium i zarządza zasobami naturalnymi."))

    s.append(art(6,
        "Terytorium Suwerennej Republiki Karakalpakstanu jest niepodzielne i integralne, "
        "a jego granice nie mogą być zmieniane bez decyzji Najwyższej Rady i narodu "
        "Republiki. Ziemia, bogactwa naturalne, zasoby podziemne, flora i fauna, "
        "infrastruktura gospodarcza, dziedzictwo kulturowe i historyczne, potencjał "
        "naukowy i techniczny są wyłączną własnością Republiki Karakalpakstanu "
        "i podstawą jej suwerenności."))

    s.append(art(7,
        "Wyjście Republiki Karakalpakstanu z ZSRR i Uzbeckiej SRR jest wyłącznym "
        "prawem Republiki Karakalpakstanu."))

    s.append(art(8,
        "Obywatele Republiki Karakalpakstanu, którzy wcześniej byli obywatelami ZSRR "
        "i Uzbeckiej SRR, stają się obywatelami Republiki Karakalpakstanu."))

    s.append(art(9,
        "Republika Karakalpakstanu posiada własny herb, flagę i hymn."))

    s.append(art(10,
        "Na terytorium Republiki Karakalpakstanu język karakalpacki jest językiem "
        "państwowym. Wszystkie narody i narodowości zamieszkujące terytorium mają "
        "możliwość nauki swojego języka ojczystego oraz języka rosyjskiego jako języka "
        "komunikacji międzyetnicznej."))

    s.append(art(11,
        "Niniejsza Deklaracja Niepodległości, określająca suwerenność Republiki "
        "Karakalpakstanu, stanowi podstawę nowej Konstytucji Republiki Karakalpakstanu "
        "i rozwoju jej ustawodawstwa."))

    s.append(art(12,
        "Do czasu przyjęcia nowej Konstytucji Suwerennej Republiki Karakalpakstanu "
        "i ustaw, wszystkie obowiązujące akty prawne pozostają w mocy."))

    # ── UWAGI KONCOWE ─────────────────────────────────────────
    s.append(Spacer(1, 0.6 * cm))
    s.append(hr_blue())
    s.append(Paragraph(
        "Deklaracja Niepodległości Republiki Karakalpakstanu została przyjęta na IV "
        "sesji Najwyższej Rady Republiki Karakalpakstanu dnia 14 grudnia 1990 roku "
        "w Nukusie. Podpisana przez 186 deputowanych.",
        S['footer_text']))
    s.append(Paragraph(
        "Decyzja o oddzieleniu się od Uzbeckiej SRR została przekazana Najwyższej "
        "Radzie Uzbeckiej SRR i Najwyższej Radzie ZSRR.",
        S['footer_text']))
    s.append(Paragraph(
        "Opracowana w listopadzie–grudniu 1990 roku, ratyfikowana 14 grudnia 1990 roku "
        "w Nukusie, Republice Karakalpakstanu.",
        S['footer_text']))

    return s

# ── STRONA KONCOWA ────────────────────────────────────────────
def build_closing_page():
    s = []
    s.append(PageBreak())
    s.append(Spacer(1, 3 * cm))
    s.append(HRFlowable(
        width="60%", thickness=2, color=GOLD,
        hAlign='CENTER', spaceAfter=20))
    s.append(Paragraph(
        "DEKLARACJA",
        S['closing_title']))
    s.append(Paragraph(
        "O suwerennosci panstwowej Republiki Karakalpakstanu",
        S['closing_sub']))
    s.append(Paragraph(
        "Przyjeta 14 grudnia 1990 roku · Nukus · Nr 82/XII",
        S['closing_sub']))
    s.append(Spacer(1, 0.5 * cm))
    s.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">'
        'www.karakalpakvoice.org</link>',
        S['cover_link']))
    s.append(Paragraph(
        "Karakalpakstan — Republika Suwerenna · Dokument archiwalny · "
        + datetime.now().strftime("%d.%m.%Y"),
        S['cover_site']))
    s.append(HRFlowable(
        width="60%", thickness=2, color=GOLD,
        hAlign='CENTER', spaceBefore=20))
    return s

# ── FUNKCJA GLOWNA ────────────────────────────────────────────
def build_pdf():
    out_dir = os.path.dirname(OUTPUT)
    if out_dir and not os.path.exists(out_dir):
        os.makedirs(out_dir)

    doc = BaseDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
        title="Deklaracja o suwerennosci panstwowej Republiki Karakalpakstanu · 1990",
        author="karakalpakvoice.org",
        subject="Deklaracja o suwerennosci panstwowej Republiki Karakalpakstanu",
        creator="www.karakalpakvoice.org",
        keywords="Karakalpakstan, suwerennosc, deklaracja, 1990, Nukus"
    )
    doc.addPageTemplates([make_page_template(doc)])

    story = []
    story += build_photo_page()
    story += build_content()
    story += build_closing_page()

    doc.build(story)
    print("✅  PDF utworzony: " + OUTPUT)
    print("    Strony: 1 (zdjecie) + tresc + zakonczenie")
    print("    Strona: www.karakalpakvoice.org")

if __name__ == "__main__":
    build_pdf()
    s = []