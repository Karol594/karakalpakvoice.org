# ============================================================
#  declaration_ru_pdf.py
#  Run: python declaration_ru_pdf.py
#  Run from: public\documents\declaration\1990\--ru\
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
OUTPUT   = os.path.join(SCRIPT_DIR, "declaration_ru.pdf")   # сол қалтаға PDF
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
                          "ДЕКЛАРАЦИЯ · ГОСУДАРСТВЕННЫЙ СУВЕРЕНИТЕТ")
        canvas.drawRightString(w - MARGIN, h - MARGIN + 0.6 * cm,
                               "1990 · 14 ДЕКАБРЯ")

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
            "[Фото не найдено]<br/>"
            "Путь: " + PHOTO.replace('\\', '/'),
            S['footer_text']))

    s.append(Spacer(1, 0.4 * cm))
    s.append(HRFlowable(
        width="80%", thickness=2, color=GOLD,
        hAlign='CENTER', spaceAfter=8))

    s.append(Paragraph("ДЕКЛАРАЦИЯ", S['photo_title']))
    s.append(Paragraph(
        "О Государственном суверенитете Республики Каракалпакстан",
        S['photo_sub']))
    s.append(Paragraph(
        "14 декабря 1990 года · г. Нукус",
        S['photo_date']))

    s.append(HRFlowable(
        width="50%", thickness=1, color=LIGHT_GRAY,
        hAlign='CENTER', spaceAfter=6))
    s.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">'
        'www.karakalpakvoice.org</link>',
        S['cover_link']))
    s.append(Paragraph(
        "Каракалпакстан — Суверенная Республика · Архивный документ",
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

# ── СОДЕРЖАНИЕ: Текст Декларации (Русский) ───────────────────
def build_content():
    s = []

    # ── ЗАГОЛОВОК ─────────────────────────────────────────────
    s.append(Spacer(1, 0.4 * cm))
    s.append(Paragraph("ДЕКЛАРАЦИЯ", S['doc_main_title']))
    s.append(hr_gold())
    s.append(Paragraph(
        "О Государственном суверенитете Республики Каракалпакстан",
        S['doc_sub_title']))
    s.append(hr_blue())

    # ── ПРЕАМБУЛА ─────────────────────────────────────────────
    s.append(Paragraph("П Р Е А М Б У Л А", S['preamble_label']))
    s.append(hr_gold())
    s.append(Paragraph(
        "Верховный Совет Каракалпакской Автономной Советской Социалистической "
        "Республики: Чувствуя историческую ответственность за судьбу "
        "многонационального народа Каракалпакстана, свободно выражая ее, уважая "
        "суверенные права всех наций и народов СССР, основываясь на неотъемлемом "
        "праве каждого народа на самоопределение, обращаясь в Верховный Совет "
        "Узбекской ССР о пересмотре ранее принятых актов, касающихся Каракалпакской "
        "АССР и противоречащих конституциям СССР, Узбекской ССР и Каракалпакской "
        "АССР, заботясь о политическом, экономическом, социальном и духовном "
        "развитии народов, решении экологических проблем, вызванных высыханием "
        "Аральского моря, принимая во внимание крайне низкий уровень жизни граждан "
        "автономной республики, проживающих в самом центре экологической катастрофы, "
        "Каракалпакстан объявляет государственный суверенитет как субъект федерации "
        "СССР и преобразует его в Суверенную Республику Каракалпакстан.",
        S['preamble_text']))
    s.append(Paragraph(
        "Отношения между Республикой Каракалпакстан, СССР и Узбекской ССР строятся "
        "на основе договоров и соглашений.",
        S['preamble_text']))

    s.append(hr_blue())

    # ── 12 СТАТЕЙ ─────────────────────────────────────────────
    s.append(art(1,
        "Республика Каракалпакстан берет под свое правовое управление все договора и "
        "соглашения, которые Советская Республика Каракалпакстан заключила с Союзом "
        "СССР и Узбекской Социалистической Республикой и делегирует себе все "
        "полномочия. Строит необходимую структуру Государственного управления на всех "
        "административных уровнях на своей территории.\n"
        "Республика Каракалпакстан, далее именуемая Республика строит все свои "
        "административные округа, создает необходимые административно хозяйственные "
        "разделения и органы государственного управления, такие как судебный, "
        "арбитражный и прокурорский надзор и другие осуществляет исключительно "
        "самостоятельно."))

    s.append(art(2,
        "Республика Каракалпакстан проводит государственное управление, принятие "
        "законов и указов и назначает судебные органы, осуществляющие надзор над "
        "исполнением принятого законодательства.\n"
        "Совет Министров Республики Каракалпакстан является высшим исполнительным и  "
        "управляющим органом, осуществляющий принятие необходимых законов, управление "
        "и надзор над исполнением принятых законов.\n"
        "Совет Министров Республики Каракалпакстан является верховным исполнительным "
        "органом и органом управления.\n"
        "Верховный Суд Республики Каракалпакстан является Высшим Судом.\n"
        "Верховный Совет Республики Каракалпакстан назначает Генерального Прокурора "
        "осуществляющего надзор над исполнением закона, правопорядок и равного права "
        "всех перед законом."))

    s.append(art(3,
        "Многонациональный народ Республики Каракалпакстан определяет и составляет "
        "Государство на своей суверенной территории.\n"
        "Народ, опираясь на Конституцию и законы непосредственно и однозначно через "
        "избранных депутатов осуществляет государственное управление. Правительство "
        "Республики Каракалпакстан уполномоченное властью осуществляет укрепление "
        "дружбы народов.\n"
        "Государство всем своим гражданам проживающим на территории Республики "
        "Каракалпакстан, не смотря на их политические взгляды, веру исповедания и "
        "другие отличия, обеспечивает всех равными правами и свободами."))

    s.append(art(4,
        "Определяется верховенство законов и Конституции на территории Республики "
        "Каракалпакстан.\n"
        "Если со стороны правительств СССР и Узбекской ССР нарушаются права граждан "
        "Республики Каракалпакстан, то на основании существующих соглашений и законов "
        "СССР и УзССР, Республика Каракалпакстан вправе приостановить все принятые "
        "межгосударственные соглашения и договора и предъявить им ноту протеста."))

    s.append(art(5,
        "Республика Каракалпакстан осуществляет защиту Конституционных Прав своих "
        "граждан, защиту их свобод, защиту их права на труд, защиту их собственности "
        "и определяет меры по осуществлению защиты, осуществляет организацию "
        "общественной жизни, осуществляет социально-культурное и экономическое "
        "развитие, осуществляет внешнеэкономическую деятельность, создание свободных "
        "экономических зон, осуществляет управление финансово-бюджетной системы, "
        "определяет основы оплаты труда и ценообразование, налоговое управление, "
        "защиту своей территории и управление природными ресурсами."))

    s.append(art(6,
        "Территория Суверенной Республики Каракалпакстан является неделимой и цельной "
        "территорией Республики Каракалпакстан и его границы не подлежат изменению без "
        "решения Верховного Совета и народа Республики Каракалпакстан. Территория "
        "Республики Каракалпакстан, его природные богатства, богатства ее недр и "
        "подземные ископаемые, растения, животный мир, созданное на территории "
        "Каракалпакстана народно хозяйственная инфраструктура, культурные и "
        "исторические наследия, научно технический и культурный потенциал является "
        "исключительной собственностью Республики Каракалпакстан и основой его "
        "Суверенитета."))

    s.append(art(7,
        "Выход Республики Каракалпакстан из состава СССР и Узбекской ССР является "
        "исключительным правом Республики Каракалпакстан."))

    s.append(art(8,
        "Граждане Республики Каракалпакстан, ранее являвшиеся гражданами СССР и "
        "Узбекской ССР, теперь являются гражданами Республики Каракалпакстан."))

    s.append(art(9,
        " Республика Каракалпакстан имеет свой герб, флаг и гимн."))

    s.append(art(10,
        "На территории Республики Каракалпакстан Каракалпакский язык является "
        "Государственным языком. Все нации и народности компактно проживающие на "
        "территории Республики Каракалпакстан имеют возможность изучать свой родной "
        "язык и изучать русский язык как язык межнационального общения."))

    s.append(art(11,
        "Эта Декларация Независимости, определяющая суверенитет Республики "
        "Каракалпакстан, является основой новой Конституции Республики Каракалпакстан "
        "предопределяющей основой развития законов Республики Каракалпакстан."))

    s.append(art(12,
        "До принятия новой Конституции Суверенной Республики Каракалпакстан и законов "
        "Республики Каракалпакстан, все действующие законы и нормативные акты "
        "остаются в силе."))

    # ── ЗАКЛЮЧИТЕЛЬНЫЕ ЗАПИСИ ────────────────────────────────
    s.append(Spacer(1, 0.6 * cm))
    s.append(hr_blue())
    s.append(Paragraph(
        "Декларация Независимости Республики Каракалпакстан был принят на 4 сессии "
        "Верховного Совета Республики Каракалпакстан 14 декабря 1990 года. "
        "Подлисали 186 депутатов Парламента Республики Каракалпакстан.",
        S['footer_text']))
    s.append(Paragraph(
        "Отделение от Узбекской ССР и декларация переданы Верховному Совету "
        "Узбекской ССР и Верховному Совету СССР.",
        S['footer_text']))
    s.append(Paragraph(
        "Разработан в ноябре - декабре 1990 года, ратифицирован 14 декабря 1990 года, "
        "в г. Нукус, Республика Каракалпакстан.",
        S['footer_text']))

    return s

# ── ЗАКЛЮЧИТЕЛЬНАЯ СТРАНИЦА ───────────────────────────────────
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
        "О Государственном суверенитете Республики Каракалпакстан",
        S['closing_sub']))
    s.append(Paragraph(
        "Принята 14 декабря 1990 года · г. Нукус · № 82/XII",
        S['closing_sub']))
    s.append(Spacer(1, 0.5 * cm))
    s.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">'
        'www.karakalpakvoice.org</link>',
        S['cover_link']))
    s.append(Paragraph(
        "Каракалпакстан — Суверенная Республика · Архивный документ · "
        + datetime.now().strftime("%d.%m.%Y"),
        S['cover_site']))
    s.append(HRFlowable(
        width="60%", thickness=2, color=GOLD,
        hAlign='CENTER', spaceBefore=20))
    return s

# ── ОСНОВНАЯ ФУНКЦИЯ ──────────────────────────────────────────
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
        title="Декларация о государственном суверенитете Республики Каракалпакстан · 1990",
        author="karakalpakvoice.org",
        subject="Декларация о государственном суверенитете Республики Каракалпакстан",
        creator="www.karakalpakvoice.org",
        keywords="Каракалпакстан, суверенитет, декларация, 1990, Нукус"
    )
    doc.addPageTemplates([make_page_template(doc)])

    story = []
    story += build_photo_page()
    story += build_content()
    story += build_closing_page()

    doc.build(story)
    print("✅  PDF создан: " + OUTPUT)
    print("    Страниц: 1 (фото) + содержание + заключение")
    print("    Сайт: www.karakalpakvoice.org")

if __name__ == "__main__":
    build_pdf()
    s = []