# ============================================================
#  declaration_kk_pdf.py
#  Іске қосу: python declaration_kk_pdf.py
#  Жобаның тамыр (root) қалтасынан орындаңыз
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
OUTPUT   = os.path.join(SCRIPT_DIR, "declaration_kk.pdf")   # сол қалтаға PDF
SITE_URL = "https://www.karakalpakvoice.org"
YEAR     = "1990"

print("📁 Қалта  :", SCRIPT_DIR)
print("🖼  Фото   :", PHOTO)
print("📄 PDF     :", OUTPUT)
print("🔍 Фото бар:", "✅ ИӘ" if os.path.exists(PHOTO) else "❌ ЖОҚ")

PAGE_W, PAGE_H = A4
MARGIN = 2.5 * cm

# ── Түслер (Конституция дизайны менен бирдей) ───────────────────
DARK_BLUE  = colors.HexColor('#0d2b4e')
MID_BLUE   = colors.HexColor('#1a4a7a')
LIGHT_BLUE = colors.HexColor('#2c6fad')
GOLD       = colors.HexColor('#b8860b')
GRAY       = colors.HexColor('#555555')
LIGHT_GRAY = colors.HexColor('#cccccc')
LINK_COLOR = colors.HexColor('#1a4a7a')

# ── Стильлер ──────────────────────────────────────────────────
def make_styles():
    return {
        # Фото беттеги жазыўлар
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
        # Улыўма элементлер
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

# ── Колонтитул (Конституциямен бирдей стиль) ─────────────────
def make_page_template(doc):
    def header_footer(canvas, doc):
        # 1-бет = фото бети, колонтитул жоқ
        if doc.page == 1:
            return

        canvas.saveState()
        w, h = PAGE_W, PAGE_H

        # Жоғары сызық
        canvas.setStrokeColor(LIGHT_BLUE)
        canvas.setLineWidth(1.2)
        canvas.line(MARGIN, h - MARGIN + 0.4 * cm,
                    w - MARGIN, h - MARGIN + 0.4 * cm)

        # Жоғары текст
        canvas.setFont('DejaVuSans', 8)
        canvas.setFillColor(MID_BLUE)
        canvas.drawString(MARGIN, h - MARGIN + 0.6 * cm,
                          "ДЕКЛАРАЦИЯ · МӘМЛЕКЕТЛИК СУВЕРЕНИТЕТ")
        canvas.drawRightString(w - MARGIN, h - MARGIN + 0.6 * cm,
                               "1990 ЖЫЛ · 14-ДЕКАБРЬ")

        # Төменги сызық
        canvas.setStrokeColor(LIGHT_BLUE)
        canvas.setLineWidth(0.8)
        canvas.line(MARGIN, MARGIN - 0.3 * cm,
                    w - MARGIN, MARGIN - 0.3 * cm)

        # Бет нөмири
        canvas.setFont('DejaVuSans', 8)
        canvas.setFillColor(GRAY)
        canvas.drawCentredString(w / 2, MARGIN - 0.55 * cm, str(doc.page))

        # Интерактив силтеме
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
            "[resolution (1).jpg фотосы табылмады]<br/>"
            "Жол: " + PHOTO.replace('\\', '/'),
            S['footer_text']))

    s.append(Spacer(1, 0.4 * cm))
    s.append(HRFlowable(
        width="80%", thickness=2, color=GOLD,
        hAlign='CENTER', spaceAfter=8))

    s.append(Paragraph("ДЕКЛАРАЦИЯ", S['photo_title']))
    s.append(Paragraph(
        "Қарақалпақстан Республикасының Мәмлекетлик Суверенитети ҳаққында",
        S['photo_sub']))
    s.append(Paragraph(
        "14-декабрь 1990-жыл · Нөкис қаласы",
        S['photo_date']))

    s.append(HRFlowable(
        width="50%", thickness=1, color=LIGHT_GRAY,
        hAlign='CENTER', spaceAfter=6))
    s.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">'
        'www.karakalpakvoice.org</link>',
        S['cover_link']))
    s.append(Paragraph(
        "Қарақалпақстан — Суверен Республика · Архивлик ҳүжжет",
        S['cover_site']))

    s.append(PageBreak())
    return s

# ── Жәрдемши функциялар ───────────────────────────────────────
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

# ── 2-Б ЕТ+: Декларация тексти ───────────────────────────────
def build_content():
    s = []

    # ── ТАҚЫРЫП ──────────────────────────────────────────────
    s.append(Spacer(1, 0.4 * cm))
    s.append(Paragraph("ДЕКЛАРАЦИЯ", S['doc_main_title']))
    s.append(hr_gold())
    s.append(Paragraph(
        "Қарақалпақстан Республикасының Мәмлекетлик Суверенитети ҳаққында",
        S['doc_sub_title']))
    s.append(hr_blue())

    # ── КІРІСПЕ ───────────────────────────────────────────────
    s.append(Paragraph("К І Р І С П Е", S['preamble_label']))
    s.append(hr_gold())
    s.append(Paragraph(
        "Қарақалпақстан Автономиялы Совет Социалистлик Республикасының Жоқарғы Кеңеси: "
        "Қарақалпақстанның көп миллетли халқының тəғдири ушын тарийхый жуўапкершиликти "
        "сезе отырып, оны еркин билдире отырып, СССРдың барлық миллетлери менен "
        "халықларының суверенли ҳуқықларына хүрмет көрсете отырып, хəр бир халықтың өз "
        "тəғдирин өзи белгилеў бойынша ажыралмас ҳуқықына тийкарлана отырып, "
        "Қарақалпақстан АССРына тийисли ҳəм СССРдың, Өзбекстан ССРының ҳəм "
        "Қарақалпақстан АССРнының конституцияларына қайшы келетуғын бурын қабыл "
        "етилген актлерди қайта көрип шығыў ҳаққында Өзбекстан ССР Жоғарғы Кеңесине "
        "мүрəжəт ете отырып, халықларды сиясий, экономикалық, социяллық ҳəм руўхый "
        "раўажландырыўға, Аралдың қурып баратырғанлығынан келип шыққан экологиялық "
        "машқалаларды шешиўге ғамқорлық ете отырып, экологиялық апатшылықтың нағыз "
        "орайында жасаўшы автономиялы республика пухараларының оғада төмен турмыс "
        "дəрежесин есапқа ала отырып, СССР федерациясының субьекти сыпатында "
        "Қарақалпақстан мəмлекетлик Суверенитетин жəриялайды ҳəм оны Суверенли "
        "Қарақалпақстан Республикасы етип қайта дүзеди.",
        S['preamble_text']))
    s.append(Paragraph(
        "Қарақалпақстан Республикасы менен СССР, Өзбекстан ССР арасындағы қатнасықлар, "
        "шəртнамалар ҳəм келисимлер тийкарында қурылады.",
        S['preamble_text']))

    s.append(hr_blue())

    # ── 12 СТАТЬЯ ─────────────────────────────────────────────
    s.append(art(1,
        "Қарақалпақстан Республикасы дүзилген шəртнамалар тийкарында Өзбекстан ССРына ҳəм "
        "СССРға ықтыярлы берилетуғын ҳуқықлық ўəкиллерден басқа мəмлекетлик ҳəкимиятқа өз "
        "аймағында толық ийе болады. Республика өзиниң мəмлекетлик дүзилисин, "
        "ҳəкимшилик-аймақлық бөлиниўин мəмлекетлик ҳəкимият ҳəм басқарыў уйымлары "
        "системасын, сондай-ақ судты, арбитражды ҳəм прокурорлық бақлаў "
        "шөлкемлестириў ислерин өз бетинше белгилейди."))

    s.append(art(2,
        "Қарақалпақстан Республикасында мəмлекетлик ҳəкимият ҳəм нызам шығарыў, атқарыўшы "
        "ҳəм суд уйымларына бөлистириў принципине муўапық əмелге асырылады.\n"
        "— Қарақалпақстан Республикасының Жоқарғы Кеңеси Қарақалпақстан Республикасы "
        "мəмлекетлик ҳəкимиятының жоқары уйымы болып табылады, ол өз жумысында нызам "
        "шығарыў, бийлик етиў ҳəм қадағалаў ўазыйпаларын əмелге асырады.\n"
        "— Қарақалпақстан Республикасының Министрлер Кеңеси Қарақалпақстан Республикасының "
        "Мəмлекетлик ҳəкимиятының жоқарғы атқарыўшы ҳəм бийлик етиўши уйымы болып "
        "табылады.\n"
        "— Қарақалпақстан Республикасының Жоқарғы Суды Қарақалпақстан Республикасының "
        "Жоқарғы Суд уйымы болып табылады.\n"
        "— Қарақалпақстан Республикасы Жоқарғы Совети тайынлайтуғын Қарақалпақстан "
        "Республикасының прокуроры нызамлардың саррас ҳəм бир қыйлы орынланыўын жоқары "
        "дәрежеде бақлап отырады."))

    s.append(art(3,
        "Қарақалпақстан Республикасының көп миллетли халқы оның мəмлекетлик Суверенитетиниң "
        "ўəкили ҳəм дəреги болып табылады. Халық Республиканың Конституциясы ҳəм тийкарында "
        "тиккелей жəне халық депутатларының Кеңеслери арқалы мəмлекетлик ҳəкимиятты иске "
        "асырады. Қарақалпақстан Республикасы мəмлекетлик ҳəкимиятын толық бийлигин "
        "пайдалана отырып, халықлар дослығын беккемлейди."))

    s.append(art(4,
        "Қарақалпақстан аймағында өзиниң ықтыярына берилген мəселелер бойынша Қарақалпақстан "
        "Республикасының Конституциясының ҳəм нызамларының үстемлиги белгиленеди. Егер "
        "СССРдың ҳəм Өзбекстан ССРның ҳуқықлық ўəкиллери шегинен шығып кетсе ҳəм "
        "Қарақалпақстан Республикасының ҳуқықларын бузатуғын болса, Республика СССРдың ҳəм "
        "Өзбекстан ССРның нызамларының, СССР ҳəм Өзбекстан ССР уйымларының басқа да "
        "актлериниң, шəртнамаларының ҳəрекет етиўин тоқтатыўға ҳəм оларға наразылық "
        "билдириўге ҳақылы."))

    s.append(art(5,
        "Қарақалпақстан Республикасы пухараларының Конституциялық ҳуқықларын, "
        "еркинликлерин ҳəм мийнетлерин, меншик қатнасықларын əмелге асырыў тəртибин, халық "
        "хожалығына ҳəм социаллық мəдений қурылысқа басшылық етиўди, сыртқы экономикалық "
        "жумысты шөлкемлестириўди, соның ишинде еркин кəрханашылық зоналарын, "
        "бюджетлик-финанс системасын мийнетке ҳақы төлеў ҳəм баҳа қойыў, салық салыў, "
        "қоршап турған орталықты қорғаў ҳəм тəбийий қорлардан пайдаланыў ислерин нызам "
        "менен ретлестириўди өз бетинше əмелге асырады."))

    s.append(art(6,
        "Қарақалпақстан Суверенли Республикасының аймағы бирден-бир бөлинбес аймақ болып "
        "табылады ҳəм Республика Жоғарғы Кеңесиниң жəне оның халқының келисимисиз "
        "өзгертилмейди. Жер, оның қазылма байлықлары, өсимликлер ҳəм ҳайуанатлар дүньясы, "
        "басқа да тəбийий қорлары, сондай-ақ Республиканың аймағында дүзилген пүткил "
        "экономикалық, илимий техникалық ҳəм мəдений потенциал Қарақалпақстан "
        "Республикасының айрықша меншиги, оның Суверенитетиниң материаллық тийкары болып "
        "табылады."))

    s.append(art(7,
        "Қарақалпақстан Республикасы СССРдан ҳəм Өзбекстан ССРнан шығыў ҳуқықын өзинде "
        "қалдырады."))

    s.append(art(8,
        "Қарақалпақстан Республикасы өзиниң пухаралығына ийе болады, Республика пухаралары "
        "соның менен бир ўақытта Өзбекстан ССРның ҳəм СССРдың пухаралары болып табылады."))

    s.append(art(9,
        "Қарақалпақстан Республикасы өзиниң мəмлекетлик символикасын, гербин, байрағын, "
        "гимнин белгилеп алады."))

    s.append(art(10,
        "Қарақалпақстан Республикасы аймағында Қарақалпақ тили мəмлекетлик тил болып "
        "табылады. Қарақалпақстан өз аймағында Республикада жəм болып жайласқан барлық "
        "халықлардың ана тиллерин, соның ишинде миллетлер аралық қатнасық тили болған рус "
        "тилиниң еркин ислеўи ҳəм раўажланыўы ушын барлық жағдайларды тəмийинлейди."))

    s.append(art(11,
        "Мəмлекетлик Суверенитети ҳаққында усы Декларация Суверенли Қарақалпақстан "
        "Республикасының жаңа Конституциясын ислеп шығыў, оның нызамларын раўажландырыў "
        "ушын тийкар болып табылады."))

    s.append(art(12,
        "Суверенли Қарақалпақстан Республикасының жаңа Конституциясы, басқа да нызамлары "
        "ҳəм нормативлик актлери қабыл етилгенге дейин, Қарақалпақстан аймағында "
        "Қарақалпақстан АССРның , Өзбекстан ССРының ҳəм СССРдың бурын қабыл етилген "
        "конституциялары ҳəм нызамлары ҳəрекет ете береди."))

    # ── ЖУЎМАҚЛАЎ ЖАЗЫЎЛАРЫ ──────────────────────────────────
    s.append(Spacer(1, 0.6 * cm))
    s.append(hr_blue())
    s.append(Paragraph(
        "1990-жылы 14-декабрьде Қарақалпақстан Республикасының Жоқарғы Кеңесиниң "
        "4-сессиясында қабыл етилди. Нөкис қаласы. 186 депутат қол қойды.",
        S['footer_text']))
    s.append(Paragraph(
        "Өзбекстан ССР нан бөлек шығыў қарары Өзбекстан ССР хəм СССР мəмлекетлерине "
        "жеткерилди ҳəм түсиниклер берилди.",
        S['footer_text']))
    s.append(Paragraph(
        "Ислеп шығарылды. Ноябрь Декабрь 1990-жыл. "
        "Ратификациядан өткизилди 14-декабрьде 1990-жыл. "
        "Нөкис қаласы, Қарақалпақстан Республикасында.",
        S['footer_text']))

    return s

# ── СОҢҒЫ БЕТ ─────────────────────────────────────────────────
def build_closing_page():
    s = []
    s.append(PageBreak())
    s.append(Spacer(1, 3 * cm))
    s.append(HRFlowable(
        width="60%", thickness=2, color=GOLD,
        hAlign='CENTER', spaceAfter=20))
    s.append(Paragraph(
        "ДЕКЛАРАЦИЯ",
        S['closing_title']))
    s.append(Paragraph(
        "Қарақалпақстан Республикасының Мәмлекетлик Суверенитети ҳаққында",
        S['closing_sub']))
    s.append(Paragraph(
        "1990-жыл 14-декабрьде қабыл етилген · Нөкис · № 82/XII",
        S['closing_sub']))
    s.append(Spacer(1, 0.5 * cm))
    s.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">'
        'www.karakalpakvoice.org</link>',
        S['cover_link']))
    s.append(Paragraph(
        "Қарақалпақстан — Суверен Республика · Архивлик ҳүжжет · "
        + datetime.now().strftime("%d.%m.%Y"),
        S['cover_site']))
    s.append(HRFlowable(
        width="60%", thickness=2, color=GOLD,
        hAlign='CENTER', spaceBefore=20))
    return s

# ── НЕГИЗГИ ФУНКЦИЯ ────────────────────────────────────────────
def build_pdf():
    # Шығыс қалтасы жоқ болса жасаймыз
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
        title="Декларация · Қарақалпақстан Мәмлекетлик Суверенитети · 1990",
        author="karakalpakvoice.org",
        subject="Қарақалпақстан Республикасының Мәмлекетлик Суверенитети ҳаққындағы Декларация",
        creator="www.karakalpakvoice.org",
        keywords="Каракалпакстан, суверенитет, декларация, 1990, Нөкис"
    )
    doc.addPageTemplates([make_page_template(doc)])

    story = []
    story += build_photo_page()    # 1-бет: фото
    story += build_content()       # 2-4 бет: декларация тексті
    story += build_closing_page()  # Соңғы бет

    doc.build(story)
    print("✅  PDF жасалды: " + OUTPUT)
    print("    Бетлер: 1 (фото) + мазмун + жуўмақлаў")
    print("    Сайт: www.karakalpakvoice.org")

if __name__ == "__main__":
    build_pdf()