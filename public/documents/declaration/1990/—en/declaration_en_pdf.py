# ============================================================
#  declaration_en_pdf.py
#  Run: python declaration_en_pdf.py
#  Run from: public\documents\declaration\1990\--en\
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
OUTPUT   = os.path.join(SCRIPT_DIR, "declaration_en.pdf")   # сол қалтаға PDF
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
                          "DECLARATION · STATE SOVEREIGNTY")
        canvas.drawRightString(w - MARGIN, h - MARGIN + 0.6 * cm,
                               "1990 · DECEMBER 14")

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
            "[Photo not found]<br/>"
            "Path: " + PHOTO.replace('\\', '/'),
            S['footer_text']))

    s.append(Spacer(1, 0.4 * cm))
    s.append(HRFlowable(
        width="80%", thickness=2, color=GOLD,
        hAlign='CENTER', spaceAfter=8))

    s.append(Paragraph("DECLARATION", S['photo_title']))
    s.append(Paragraph(
        "On State Sovereignty of the Republic of Karakalpakstan",
        S['photo_sub']))
    s.append(Paragraph(
        "December 14, 1990 · Nukus City",
        S['photo_date']))

    s.append(HRFlowable(
        width="50%", thickness=1, color=LIGHT_GRAY,
        hAlign='CENTER', spaceAfter=6))
    s.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">'
        'www.karakalpakvoice.org</link>',
        S['cover_link']))
    s.append(Paragraph(
        "Karakalpakstan — Sovereign Republic · Archival Document",
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

# ── CONTENT: Declaration text (English) ──────────────────────
def build_content():
    s = []

    # ── TITLE ────────────────────────────────────────────────
    s.append(Spacer(1, 0.4 * cm))
    s.append(Paragraph("DECLARATION", S['doc_main_title']))
    s.append(hr_gold())
    s.append(Paragraph(
        "On State Sovereignty of the Republic of Karakalpakstan",
        S['doc_sub_title']))
    s.append(hr_blue())

    # ── PREAMBLE ─────────────────────────────────────────────
    s.append(Paragraph("P R E A M B L E", S['preamble_label']))
    s.append(hr_gold())
    s.append(Paragraph(
        "The Supreme Council of the Karakalpak Autonomous Soviet Socialist Republic: "
        "Feeling a historical responsibility for the fate of the multinational people of "
        "Karakalpakstan, freely expressing this responsibility, respecting the sovereign "
        " rights of all nations and peoples of the USSR, and based on the inalienable right "
        "of every people to self-determination, appealing to the Supreme Council of the "
        "Uzbek SSR to review previously adopted acts concerning the Karakalpak ASSR that "
        "contradict the constitutions of the USSR, the Uzbek SSR, and the Karakalpak ASSR, "
        "concerned about the political, economic, social, and spiritual development of the "
        "peoples, and the resolution of environmental problems caused by the drying up of "
        "the Aral Sea, and taking into account the extremely low standard of living of the "
        "citizens of the autonomous republic, living in the very center of an environmental "
        "disaster, Karakalpakstan declares state sovereignty as a federal subject of the "
        "USSR and transforms it into the Sovereign Republic of Karakalpakstan.",
        S['preamble_text']))
    s.append(Paragraph(
        "Relations between the Republic of Karakalpakstan, the USSR, and the Uzbek SSR "
        "are based on treaties and agreements.",
        S['preamble_text']))

    s.append(hr_blue())

    # ── 12 ARTICLES ──────────────────────────────────────────
    s.append(art(1,
        "The Republic of Karakalpakstan takes under its legal control all the treaties and "
        "agreements that the Soviet Republic. The Republic of Karakalpakstan has concluded with the USSR "
        "and the Uzbek Socialist Republic and delegates all its powers to itself. Builds the "
        "necessary structure of State administration at all administrative levels on its "
        " territory, the Republic of Karakalpakstan hereinafter referred to as the Republic builds all its "
        "administrative districts, creates the necessary administrative divisions and state administration "
        "bodies, such as the judicial, arbitration and prosecutorial supervision and others are carried "
        "out exclusively independently."))

    s.append(art(2,
        "The Republic of Karakalpakstan conducts public administration, enacts laws and "
        "decrees, and appoints judicial bodies that oversee the implementation of the adopted "
        "legislation.\n"
        "The Supreme Council of the Republic of Karakalpakstan is the supreme body of state "
        "administration, which makes the necessary laws, manages and supervises the "
        "implementation of the adopted laws.\n"
        "The Council of Ministers of the Republic of Karakalpakstan is the supreme executive "
        "body and governing body.\n"
        "The Supreme Court of the Republic of Karakalpakstan is the Highest Court.\n"
        "The Supreme Council of the Republic of Karakalpakstan appoints the Prosecutor "
        "General to oversee the implementation of the law, the rule of law and the equal "
        "rights of all before the law."))

    s.append(art(3,
        "The multinational people of the Republic of Karakalpakstan shall determine and "
        "constitute a State on their sovereign territory.\n"
        "The people, relying on the Constitution and laws, directly and unambiguously "
        "through the elected deputies, exercise State administration. The Government of the "
        "Republic of Karakalpakstan authorized by the government to strengthen the friendship "
        "of peoples.\n"
        "The State provides all its citizens residing in the territory of the Republic of "
        "Karakalpakstan with equal rights and freedoms, regardless of their political views, "
        "religious beliefs and other differences."))

    s.append(art(4,
        "The supremacy of laws and the Constitution in the territory of the Republic of "
        "Karakalpakstan is determined. If the rights of citizens of the Republic of "
        "Karakalpakstan are violated by the governments of the USSR and the Uzbek SSR, then "
        "on the basis of existing agreements and laws of the USSR and the Uzbek SSR, the "
        "Republic of Karakalpakstan has the right to suspend all interstate agreements and agreements and "
        "submit a note of protest to them."))

    s.append(art(5,
        "The Republic of Karakalpakstan shall protect the Constitutional Rights of its "
        "citizens, the protection of their freedoms and protect their the right to work, "
        "protection of their property and defines the measures for the implementation of "
        "protection, organizes public life, carries out socio-cultural and economic "
        "development, provides externally economic activity, the creation of free economic "
        "zones, manages financial budget the system determines the basis of wage and pricing, "
        "tax administration, protection of its territory and management of natural resources."))

    s.append(art(6,
        "The territory of the Sovereign Republic of Karakalpakstan is an indivisible and "
        "integral territory of the Republic Karakalpakstan and its borders are not subject "
        "to change without the decision of the Supreme Council and the people of the Republic "
        "Karakalpakstan The territory of the Republic of Karakalpakstan, its natural "
        "resources, the riches of its subsoil and underground fossils, plants, wildlife, the "
        "national economic infrastructure created on the territory of Karakalpakstan, cultural "
        " and historical heritage, scientific, technical and cultural potential is the exclusive "
        "property of the Republic of Karakalpakstan. The Republic of Karakalpakstan and the basis "
        "of its Sovereignty."))

    s.append(art(7,
        "The separation of the Republic of Karakalpakstan from the USSR from the Uzbek SSR "
        "is the exclusive right of the Republic Karakalpakstan"))

    s.append(art(8,
        "Citizens of the Republic of Karakalpakstan who were citizens of the USSR and the "
        "Uzbek SSR are now citizens of the Republic of Karakalpakstan."))

    s.append(art(9,
        "The Republic of Karakalpakstan has its own coat of arms, flag and anthem."))

    s.append(art(10,
        "On the territory of the Republic of Karakalpakstan, the Karakalpak language is the "
        "State language. All nations and nationalities living compactly on the territory of "
        "the Republic of Karakalpakstan have the opportunity to study their native language "
        "learn Russian as a language of interethnic communication."))

    s.append(art(11,
        "This Declaration of Independence, which defines the sovereignty of the Republic of "
        "Karakalpakstan, is the basis of the new The Constitution of the Republic of "
        "Karakalpakstan and the determining basis for the development of the laws of the "
        "Republic of Karakalpakstan."))

    s.append(art(12,
        "Until the adoption of the new Constitution of the Sovereign Republic of "
        "Karakalpakstan and the laws of the Republic of Karakalpakstan, all existing laws "
        "and regulations remain in force."))

    # ── CLOSING NOTES ────────────────────────────────────────
    s.append(Spacer(1, 0.6 * cm))
    s.append(hr_blue())
    s.append(Paragraph(
        "The Declaration of Independence of the Republic of Karakalpakstan was adopted at "
        "the 4th session of the Supreme Council of the Republic of Karakalpakstan "
        "December 14, 1990 Signed by 186 deputies of the Parliament of the Republic "
        "of Karakalpakstan.",
        S['footer_text']))
    s.append(Paragraph(
        "The separation from the Uzbek SSR and the declaration were transferred to the "
        "Supreme Soviet of the Uzbek SSR and the Supreme Soviet of the USSR.",
        S['footer_text']))
    s.append(Paragraph(
        "Developed November-December 1990, ratified December 14, 1990, "
        " in Nukus, Republic of Karakalpakstan.",
        S['footer_text']))

    return s

# ── CLOSING PAGE ──────────────────────────────────────────────
def build_closing_page():
    s = []
    s.append(PageBreak())
    s.append(Spacer(1, 3 * cm))
    s.append(HRFlowable(
        width="60%", thickness=2, color=GOLD,
        hAlign='CENTER', spaceAfter=20))
    s.append(Paragraph(
        "DECLARATION",
        S['closing_title']))
    s.append(Paragraph(
        "On State Sovereignty of the Republic of Karakalpakstan",
        S['closing_sub']))
    s.append(Paragraph(
        "Adopted December 14, 1990 · Nukus · No. 82/XII",
        S['closing_sub']))
    s.append(Spacer(1, 0.5 * cm))
    s.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">'
        'www.karakalpakvoice.org</link>',
        S['cover_link']))
    s.append(Paragraph(
        "Karakalpakstan — Sovereign Republic · Archival Document · "
        + datetime.now().strftime("%d.%m.%Y"),
        S['cover_site']))
    s.append(HRFlowable(
        width="60%", thickness=2, color=GOLD,
        hAlign='CENTER', spaceBefore=20))
    return s

# ── MAIN ──────────────────────────────────────────────────────
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
        title="Declaration on State Sovereignty of the Republic of Karakalpakstan · 1990",
        author="karakalpakvoice.org",
        subject="Declaration on State Sovereignty of the Republic of Karakalpakstan",
        creator="www.karakalpakvoice.org",
        keywords="Karakalpakstan, sovereignty, declaration, 1990, Nukus"
    )
    doc.addPageTemplates([make_page_template(doc)])

    story = []
    story += build_photo_page()
    story += build_content()
    story += build_closing_page()

    doc.build(story)
    print("✅  PDF created: " + OUTPUT)
    print("    Pages: 1 (photo) + content + closing")
    print("    Site: www.karakalpakvoice.org")

if __name__ == "__main__":
    build_pdf()