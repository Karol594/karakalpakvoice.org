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

# — Fonts —————————————————————————————————————————————————————————————————
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

# — Styles ————————————————————————————————————————————————————————————————
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

# — Header / Footer ———————————————————————————————————————————————————————
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
                          "CONSTITUTION OF THE REPUBLIC OF KARAKALPAKSTAN")
        canvas.drawRightString(w - MARGIN, h - MARGIN + 0.6*cm,
                               "YEAR " + YEAR)

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

# — Cover page ————————————————————————————————————————————————————————————
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

    story.append(Paragraph("REPUBLIC OF KARAKALPAKSTAN", S['cover_republic']))
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph("CONSTITUTION", S['cover_title']))
    story.append(Spacer(1, 0.3*cm))

    story.append(HRFlowable(width="60%", thickness=1.5,
                             color=LIGHT_BLUE, hAlign='CENTER', spaceAfter=8))

    story.append(Paragraph(
        "ADOPTED ON APRIL 9, 1993<br/>BY THE SUPREME COUNCIL OF THE REPUBLIC OF KARAKALPAKSTAN",
        S['cover_adopted']
    ))
    story.append(Spacer(1, 0.4*cm))

    amendments = (
        "(With amendments and additions introduced on February 26, 1994 at the fifteenth "
        "session of the Supreme Council of the Republic of Karakalpakstan of the twelfth "
        "convocation; on October 31, 1995 at the fourth session and on December 15, 1997 "
        "at the thirteenth session of the Jokargy Kenes of the Republic of Karakalpakstan "
        "of the first convocation; on November 12, 2003 at the twelfth session of the "
        "Jokargy Kenes of the Republic of Karakalpakstan of the second convocation; "
        "on June 27, 2014 at the fifteenth session of the Jokargy Kenes of the Republic "
        "of Karakalpakstan; on June 29, 2019 at the twenty-sixth session of the Jokargy "
        "Kenes of the Republic; on December 16, 2019 at the twenty-ninth session of the "
        "Jokargy Kenes of the Republic; and on February 12, 2021 at the fifteenth session "
        "of the Jokargy Kenes of the Republic)"
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
        "Karakalpakstan — a sovereign republic | Archival document",
        S['cover_site']
    ))
    story.append(PageBreak())
    return story

# — Helper functions ——————————————————————————————————————————————————————
def art(num, text):
    items = []
    items.append(Paragraph("Article " + str(num) + ".", S['article_title']))
    for para in text.strip().split('\n'):
        para = para.strip()
        if para:
            items.append(Paragraph(para, S['article_text']))
    return KeepTogether(items)

def art_excluded(num):
    items = []
    items.append(Paragraph("Article " + str(num) + ".", S['article_title']))
    items.append(Paragraph("[EXCLUDED].", S['excluded']))
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

# — Main content ——————————————————————————————————————————————————————————
def build_content():
    s = []

    # PREAMBLE
    s.append(Paragraph("PREAMBLE", S['preamble_title']))
    s.append(hr_gold())
    s.append(Paragraph(
        "The people of the Republic of Karakalpakstan, solemnly proclaiming their commitment to human rights and the principles of state sovereignty, "
        "recognizing their high responsibility before present and future generations, relying on the historical experience of the development of Karakalpak statehood, "
        "affirming their fidelity to the ideals of democracy and social justice, "
        "acknowledging the primacy of universally recognized norms of international law, "
        "striving to ensure a dignified life for the citizens of the republic, "
        "setting as their goal the creation of a humane, democratic, "
        "and lawful state, and seeking to guarantee civil peace and national harmony, "
        "hereby adopt, through their duly authorized representatives, "
        "this Constitution of the Republic of Karakalpakstan.",
        S['preamble_text']
    ))

    # SECTION ONE
    s.append(PageBreak())
    s.append(section("SECTION ONE\nFUNDAMENTAL PRINCIPLES"))
    s.append(hr_blue())

    s.append(chapter("CHAPTER I\nSTATE SOVEREIGNTY"))
    s.append(art("1",
        "Karakalpakstan is a sovereign democratic republic within the Republic of Uzbekistan. "
        "The names “Republic of Karakalpakstan” and “Karakalpakstan” are equivalent.\n"
        "The mutual relations between the Republic of Uzbekistan and the Republic of Karakalpakstan within the framework "
        "of the Constitution of the Republic of Uzbekistan are regulated by treaties "
        "and agreements concluded between the Republic of Uzbekistan "
        "and the Republic of Karakalpakstan.\n"
        "The Republic of Karakalpakstan has the right to secede from the Republic of Uzbekistan on the basis of a "
        "nationwide referendum of the people of Karakalpakstan."
    ))
    s.append(art("2",
        "The state expresses the will of the people and serves their interests. "
        "State bodies and officials are accountable to society and to citizens."
    ))
    s.append(art("3",
        "The Republic of Karakalpakstan independently resolves issues of its "
        "administrative‑territorial structure, determines the system of state authorities and "
        "administration, and conducts policies coordinated with the policies of "
        "the Republic of Uzbekistan.\n"
        "The territory and borders of the Republic of Karakalpakstan are inviolable, "
        "cannot be altered, and are indivisible."
    ))
    s.append(art("4",
        "The state languages of the Republic of Karakalpakstan are the "
        "Karakalpak language and the Uzbek language.\n"
        "The Republic of Karakalpakstan ensures respectful treatment of the languages, customs, "
        "and traditions of the nations and peoples residing on its territory, "
        "and creates conditions for their development."
    ))
    s.append(art("5",
        "The Republic of Karakalpakstan has its own state symbols — the flag, "
        "the emblem, and the anthem — approved by law."
    ))
    s.append(art("6", 
        "The capital of the Republic of Karakalpakstan is the city of Nukus."
    ))

    s.append(chapter("CHAPTER II\nPOPULAR SOVEREIGNTY"))
    s.append(art("7",
        "The people are the sole source of state power.\n"
        "State power in the Republic of Karakalpakstan is exercised in the interests of the people "
        "and exclusively by bodies authorized by the Constitution of the Republic of "
        "Karakalpakstan and the laws adopted on its basis.\n"
        "The usurpation of state authority, the suspension or termination of the activities of state "
        "bodies in a manner not provided for by the Constitution, as well as the creation of new or parallel structures of power, "
        "are unconstitutional and entail liability under the law."
    ))
    s.append(art("8",
        "Citizens of the Republic of Karakalpakstan are the citizens of the "
        "Republic of Uzbekistan residing on the territory of Karakalpakstan."
    ))
    s.append(art("9",
        "The most important issues of state and public life shall be submitted for public discussion "
        "and put to a popular vote (referendum). "
        "The procedure for conducting a referendum is determined by law."
    ))
    s.append(art("10",
        "Only the Jokargy Kenes of the republic, elected by the people of Karakalpakstan, "
        "may act on behalf of the people of Karakalpakstan.\n"
        "No part of society, political party, public association, movement, "
        "or individual may speak on behalf of the people of the Republic of Karakalpakstan."
    ))
    s.append(art("11",
        "The system of state power of the Republic of Karakalpakstan is based on the "
        "principle of separation of powers into legislative, executive, and judicial branches."
    ))
    s.append(art("12",
        "Public life in the Republic of Karakalpakstan develops on "
        "the basis of the diversity of political institutions, ideologies, and opinions.\n"
        "No ideology may be established as an official state ideology."
    ))
    s.append(art("13",
        "Democracy in the Republic of Karakalpakstan is based on universal human principles, "
        "according to which the highest value is the human being, their life, "
        "freedom, honor, dignity, and other inalienable rights.\n"
        "Democratic rights and freedoms are protected by the Constitution and the laws."
    ))
    s.append(art("14",
        "The state conducts its activities on the principles of social justice and "
        "the interests of the well‑being of the individual and society."
    ))

    s.append(chapter("CHAPTER III\nSUPREMACY OF THE CONSTITUTION AND THE LAW"))
    s.append(art("15",
        "The unconditional supremacy of the Constitutions and laws of the Republic of Uzbekistan "
        "and the Republic of Karakalpakstan is recognized in the Republic of Karakalpakstan.\n"
        "The state, its bodies, officials, public associations, "
        "and citizens act in accordance with the Constitution and the laws."
    ))
    s.append(art("16",
        "No provision of this Constitution may be interpreted to the detriment of the rights "
        "and interests of the Republic of Karakalpakstan.\n"
        "No law or other normative legal act may contradict the norms and "
        "principles of the Constitution."
    ))

    s.append(chapter("CHAPTER IV\nINTERNATIONAL AND FOREIGN ECONOMIC RELATIONS\nOF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art("17",
        "International scientific, cultural, and foreign economic relations of the Republic of "
        "Karakalpakstan are carried out in accordance with the legislation of the "
        "Republic of Uzbekistan and the Republic of Karakalpakstan."
    ))

    # SECTION TWO
    s.append(PageBreak())
    s.append(section("SECTION TWO\nFUNDAMENTAL RIGHTS, FREEDOMS, AND DUTIES\nOF THE PERSON AND THE CITIZEN"))
    s.append(hr_blue())

    s.append(chapter("CHAPTER V\nGENERAL PROVISIONS"))
    s.append(art("18",
        "All citizens of the Republic of Karakalpakstan have equal rights and freedoms and "
        "are equal before the law regardless of sex, race, nationality, language, religion, "
        "social origin, beliefs, personal or social status.\n"
        "Privileges may be established only by law and must comply "
        "with the principles of social justice."
    ))
    s.append(art("19",
        "A citizen of the Republic of Karakalpakstan and the state are bound by mutual "
        "rights and mutual responsibility. The rights and freedoms of citizens enshrined in the "
        "Constitution and laws are inviolable, and no one may be deprived of them "
        "or have them restricted without a court decision."
    ))
    s.append(art("20",
        "The exercise of rights and freedoms by a citizen must not violate the lawful "
        "interests, rights, and freedoms of other persons, the state, or society."
    ))

    s.append(chapter("CHAPTER VI\nCITIZENSHIP"))
    s.append(art("21",
        "In accordance with the unified citizenship established in the Republic of Uzbekistan, "
        "every citizen of the Republic of Karakalpakstan is a citizen of the Republic of Uzbekistan.\n"
        "The grounds and procedure for acquiring and losing citizenship are determined by the Law "
        "of the Republic of Uzbekistan on Citizenship.\n"
        "Foreign citizens and stateless persons residing on the territory of the Republic of "
        "Karakalpakstan are guaranteed rights and freedoms in accordance with the norms of international law. "
        "They bear the obligations established by the Constitution and laws "
        "of the Republic of Karakalpakstan and by international treaties of the Republic of Uzbekistan."
    ))

    s.append(chapter("CHAPTER VII\nPERSONAL RIGHTS AND FREEDOMS"))
    s.append(art("22",
        "The right to life is the inalienable right of every person. "
        "Any encroachment upon it constitutes the gravest crime."
    ))
    s.append(art("23",
        "Everyone has the right to freedom and personal inviolability. "
        "No one may be subjected to arrest or detention except on the basis of law."
    ))
    s.append(art("24",
        "Anyone accused of committing a crime is presumed innocent until their guilt "
        "is established in accordance with the law through a public court hearing, "
        "during which all opportunities for defense are ensured.\n"
        "No one may be subjected to torture, violence, or any other cruel or degrading treatment.\n"
        "No one may be subjected to medical or scientific experimentation without their consent."
    ))
    s.append(art("25",
        "Everyone has the right to protection from encroachment upon their honor and "
        "dignity, interference in their private life, and the inviolability of their home.\n"
        "No one has the right to enter a home, conduct a search or inspection, "
        "or violate the secrecy of correspondence and telephone conversations "
        "except in cases and in the manner prescribed by law."
    ))
    s.append(art("26",
        "A citizen of the Republic of Karakalpakstan, being a citizen of the Republic of Uzbekistan, "
        "has the right to freely move throughout the territory of the Republic of Uzbekistan, "
        "to enter and leave the Republic of Uzbekistan, except for restrictions established by law."
    ))
    s.append(art("27",
        "Everyone has the right to freedom of thought, speech, and belief.\n"
        "Everyone has the right to seek, receive, and disseminate any information, "
        "except information directed against the existing "
        "constitutional order or other restrictions provided by law.\n"
        "Freedom of opinion and its expression may be limited by law on grounds "
        "of state or other protected secrecy."
    ))
    s.append(art("28",
        "All state bodies, public associations, and officials of the Republic of Karakalpakstan are "
        "obliged to ensure that citizens have the opportunity to familiarize themselves with "
        "documents, decisions, and other materials affecting their rights and interests."
    ))
    s.append(art("29",
        "Freedom of conscience is guaranteed for all. "
        "Everyone has the right to profess any religion or not to profess any religion. "
        "The forced imposition of religious views is inadmissible."
    ))

    s.append(chapter("CHAPTER VIII\nPOLITICAL RIGHTS"))
    s.append(art("30",
        "Citizens of the Republic of Karakalpakstan have the right to participate in the management "
        "of the affairs of society and the state both directly and through their representatives. "
        "Such participation is exercised through self‑government, the holding of referendums, the "
        "democratic formation of state bodies, as well as through the development and improvement "
        "of public oversight over the activities of state bodies.\n"
        "The procedure for exercising public oversight over the activities "
        "of state bodies is determined by law."
    ))
    s.append(art("31",
        "Citizens have the right to exercise their public activity in the form of rallies, meetings, "
        "and demonstrations in accordance with the legislation of the Republic of Karakalpakstan. "
        "Authorities may suspend or prohibit the holding "
        "of such events only on justified grounds of security."
    ))
    s.append(art("32",
        "Citizens of the Republic of Karakalpakstan have the right to unite in trade unions, "
        "political parties, and other public associations, and to participate in mass movements.\n"
        "No one may infringe upon the rights, freedoms, or dignity of persons who constitute an "
        "opposition minority in political parties, public associations, "
        "mass movements, or in representative bodies of power."
    ))
    s.append(art("33",
        "Everyone has the right, individually or jointly with others, to address applications, "
        "proposals, and complaints to competent state bodies, institutions, "
        "or to representatives of the people.\n"
        "Applications, proposals, or complaints must be reviewed in the manner and "
        "within the time limits established by law."
    ))

    s.append(chapter("CHAPTER IX\nECONOMIC AND SOCIAL RIGHTS"))
    s.append(art("34",
        "Everyone has the right to property. The secrecy of bank deposits and "
        "the right of inheritance are guaranteed by law."
    ))
    s.append(art("35",
        "Everyone has the right to work, to freely choose employment, to fair working conditions, "
        "and to protection against unemployment, in the manner established by law.\n"
        "Forced labor is prohibited, except in the execution of a court "
        "sentence or in other cases provided by law."
    ))
    s.append(art("36",
        "Employees have the right to paid rest. "
        "The duration of working hours and paid leave is determined by law."
    ))
    s.append(art("37",
        "Everyone has the right to social security in old age, "
        "in cases of loss of working capacity, as well as in the event "
        "of the loss of a breadwinner, and in other cases provided by law.\n"
        "Pensions, allowances, and other types of social assistance may not be lower than "
        "the officially established minimum standard of living."
    ))
    s.append(art("38", 
    "Everyone has the right to qualified medical care."
    ))

    s.append(art("39",
        "Everyone has the right to education. The state guarantees free general education. "
        "Schooling is under state supervision."
    ))
    s.append(art("40",
        "Everyone is guaranteed freedom of artistic, scientific, "
        "and technical creativity, and the right to use the achievements of culture.\n"
        "The state promotes the cultural, scientific, and technical development of society."
    ))

    s.append(chapter("CHAPTER X\nGUARANTEES OF HUMAN RIGHTS AND FREEDOMS"))
    s.append(art("41",
        "The state ensures the rights and freedoms of citizens "
        "enshrined in the Constitution and the laws."
    ))
    s.append(art("42",
        "veryone is guaranteed judicial protection of their rights and freedoms, "
        "as well as the right to appeal in court against unlawful actions of state bodies, "
        "officials, and public associations."
    ))
    s.append(art("43",
        "The rights of minors, persons with disabilities, "
        "and elderly individuals living alone are under the protection of the state."
    ))
    s.append(art("44", "Women and men have equal rights."))

    s.append(chapter("CHAPTER XI\nDUTIES OF CITIZENS"))
    s.append(art("45", 
    "All citizens bear the duties assigned to them by the Constitution."
    ))

    s.append(art("46",
        "Citizens are obliged to comply with the Constitution and the laws, "
        "and to respect the rights, freedoms, honor, and dignity of others."
    ))
    s.append(art("47",
        "Citizens are obliged to preserve the historical, spiritual, "
        "and cultural heritage of the people of Karakalpakstan.\n"
        "Cultural monuments are protected by the state."
    ))
    s.append(art("48", 
    "Citizens are obliged to treat the surrounding natural environment with care."
    ))

    s.append(art("49", 
    "Citizens are obliged to pay taxes and local fees established by law."
    ))

    s.append(art("50",
        "The defense of the Republic of Uzbekistan and the Republic of Karakalpakstan is the "
        "duty of every citizen of the Republic of Karakalpakstan. Citizens are obliged to "
        "perform military or alternative service in the manner prescribed by law."
    ))

    # SECTION THREE
    s.append(PageBreak())
    s.append(section("SECTION THREE\nSOCIETY AND THE INDIVIDUAL"))
    s.append(hr_blue())

    s.append(chapter("CHAPTER XII\nECONOMIC FOUNDATIONS OF SOCIETY"))
    s.append(art("51",
        "The foundation of the economy of Karakalpakstan, aimed at the development of market relations, "
        "is property in its various forms. The state guarantees freedom of economic activity, entrepreneurship, "
        "and labor, taking into account the priority of consumer rights, as "
        "well as equality and legal protection of all forms of property.\n"
        "Private property, along with other forms of property, "
        "is inviolable and protected by the state. An owner may be deprived of "
        "property only in cases and in the manner prescribed by law."
    ))
    s.append(art("52",
        "An owner possesses, uses, and disposes of their property at their discretion. "
        "The use of property must not cause harm to the environment or violate the rights "
        "and legally protected interests of citizens, legal entities, or the state."
    ))
    s.append(art("53",
        "Land, its subsoil, water, flora and fauna, and other natural resources are "
        "ational wealth, subject to rational use and protected by the state."
    ))

    s.append(chapter("CHAPTER XIII\nPUBLIC ASSOCIATIONS"))
    s.append(art("54",
        "Public associations in the Republic of Karakalpakstan include trade unions, political parties, "
        "scholarly societies, women’s organizations, veterans’ and "
        "youth organizations, creative unions, mass movements, "
        "and other associations of citizens registered in accordance with the law."
    ))
    s.append(art("55",
        "The creation and activity of political parties or other public associations whose aims "
        "include the violent alteration of the constitutional order, opposition to the sovereignty, "
        "integrity, and security of the Republic, violation of the constitutional rights and "
        "freedoms of its citizens, propaganda of war, social, national, religious, or racial hostility, "
        "or encroachment upon the health and morality of the people, as well as militarized "
        "associations and political parties based on "
        "national or religious grounds, are prohibited.\n"
        "The creation of secret societies and associations is prohibited."
    ))
    s.append(art("56",
        "The state ensures the observance of the rights and lawful interests of public associations "
        "and provides them with equal legal opportunities to participate in public life.\n"
        "Interference by state bodies and officials in the activities of public associations, "
        "as well as interference by public associations in the "
        "activities of state bodies and officials, is not permitted."
    ))
    s.append(art("57",
        "Trade unions express and protect the socio‑economic rights and interests of workers. "
        "Membership in trade unions is voluntary."
    ))
    s.append(art("58",
        "Political parties express the political will of various social strata and groups and, "
        "through their democratically elected representatives, participate in the formation of "
        "state power. Political parties are obliged, in the prescribed manner, to submit public "
        "reports to the Jokargy Kenes or its authorized "
        "body on the sources of financing of their activities."
    ))
    s.append(art("59",
        "Religious organizations and associations are separated from the state and are equal before "
        "the law. The state does not interfere in the activities of religious associations."
    ))
    s.append(art("60",
        "The dissolution, prohibition, or restriction of the activities of public associations may "
        "occur only on the basis of a court decision."
    ))

    s.append(chapter("CHAPTER XIV\nFAMILY"))
    s.append(art("61",
        "The family is the fundamental unit of society and has the "
        "right to the protection of society and the state.\n"
        "Marriage is based on the free consent and equality of the parties."
    ))
    s.append(art("62",
        "Parents are obliged to support and raise their children until they reach adulthood.\n"
        "The state and society ensure the maintenance, upbringing, and education of orphans and "
        "children deprived of parental care, and encourage charitable activities toward them."
    ))
    s.append(art("63",
        "Children are equal before the law regardless of their origin "
        "or the marital status of their parents.\n"
        "Motherhood and childhood are protected by the state."
    ))
    s.append(art("64", 
    "Adult able‑bodied children are obliged to care for their parents."
    ))

    s.append(chapter("CHAPTER XV\nMASS MEDIA"))
    s.append(art("65",
        "The mass media are free and operate in accordance with the law. They bear responsibility,, "
        "in the prescribed manner, for the accuracy of the information they disseminate.\n"
        "Censorship is not permitted."
    ))

    # SECTION FOUR
    s.append(PageBreak())
    s.append(section("SECTION FOUR\nADMINISTRATIVE-TERRITORIAL STRUCTURE"))
    s.append(hr_blue())

    s.append(chapter("CHAPTER XVI\nADMINISTRATIVE-TERRITORIAL STRUCTURE\nOF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art("66",
        "The Republic of Karakalpakstan consists of districts, cities, towns, and villages (auls)."
    ))
    s.append(art("67",
        "The formation and abolition of districts and cities, as well as the alteration of their "
        "boundaries, shall be carried out by the Jokargy Kenes of the Republic of Karakalpakstan."
    ))

    # SECTION FIVE
    s.append(PageBreak())
    s.append(section("PART FIVE\nORGANIZATION OF STATE POWER"))
    s.append(hr_blue())

    s.append(chapter("CHAPTER XVII\nTHE JOKARGY KENES OF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art("68",
        "The supreme state representative body of authority is the Jokargy Kenes of the Republic "
        "of Karakalpakstan, which exercises legislative power."
    ))
    s.append(art("69",
        "The Jokargy Kenes of the Republic of Karakalpakstan consists of 65 deputies elected from "
        "territorial constituencies on a multi-party basis for a term of 5 years.\n"
        "Citizens of the Republic of Uzbekistan and the Republic of Karakalpakstan who have reached "
        "the age of twenty-five by the day of the election and have been permanent residents in the "
        "territory of the Republic of Uzbekistan and the Republic of Karakalpakstan for at least "
        "five years shall have the right to be elected to the Jokargy Kenes of the "
        "Republic of Karakalpakstan.\n"
        "The requirements for candidates for deputies shall be determined by law."
    ))

    # Article 70 — with excluded sub-items in red
    s.append(Paragraph("Article 70.", S['article_title']))
    s.append(Paragraph(
        "The exclusive powers of the Jokargy Kenes of the Republic of Karakalpakstan include:",
        S['article_text']
    ))
    s.append(Paragraph(
        "1) adoption of the Constitution of the Republic of Karakalpakstan, and the introduction "
        "of amendments and additions thereto;",
        S['article_text']
    ))
    s.append(Paragraph(
        "2) adoption of the laws of the Republic of Karakalpakstan, the introduction of amendments "
        "and additions thereto, and the interpretation of the laws of the Republic of Karakalpakstan;",
        S['article_text']
    ))
    s.append(Paragraph(
        "3) adoption of state strategic programs for economic and social development;",
        S['article_text']
    ))
    s.append(Paragraph(
        "4) election of the Chairman of the Jokargy Kenes of the Republic of Karakalpakstan and "
        "his deputy;",
        S['article_text']
    ))
    s.append(Paragraph(
        "5) formation of the Presidium of the Jokargy Kenes of the Republic of Karakalpakstan;",
        S['article_text']
    ))
    s.append(Paragraph(
        "6) appointment and dismissal of the Chairman of the Council of Ministers of the Republic "
        "Karakalpakstan upon the nomination of the Chairman of the Jokargy Kenes of the Republic "
        "of Karakalpakstan, agreed with the President of the Republic of Uzbekistan;",
        S['article_text']
    ))
    s.append(Paragraph(
        "7) appointment and dismissal of the deputy chairmen of the Council of Ministers of the "
        "Republic of Karakalpakstan and members of the Council of Ministers of the Republic of "
        "Karakalpakstan, and the formation and abolition of ministries, state committees, and other "
        "bodies of state administration of the Republic of Karakalpakstan;",
        S['article_text']
    ))
    s.append(Paragraph(
        "8) election of the Committee of Constitutional Oversight of the Republic of Karakalpakstan, "
        "the election and dismissal of the chairman and deputy chairmen of the Court of the "
        "Republic of Karakalpakstan, and the chairman and deputy chairman of the Administrative "
        "Court of the Republic of Karakalpakstan;",
        S['article_text']
    ))
    s.append(excluded_item("9) [EXCLUDED];"))
    s.append(Paragraph(
        "10) appointment and dismissal, upon the submission of the Presidium of the Jokargy Kenes "
        "of the Republic of Karakalpakstan and with the agreement of the Prosecutor General of the "
        "Republic of Uzbekistan, of the Prosecutor of the Republic of Karakalpakstan;",
        S['article_text']
    ))
    s.append(excluded_item("11) [EXCLUDED];"))
    s.append(Paragraph(
        "12) suspension and annulment of decisions of local Councils of People’s Deputies;",
        S['article_text']
    ))
    s.append(Paragraph(
        "13) legislative regulation of issues of administrative‑territorial structure;",
        S['article_text']
    ))
    s.append(Paragraph(
        "14) determination of the system and powers of republican and local state authorities;",
        S['article_text']
    ))
    s.append(Paragraph(
        "15) approval, upon the submission of the Council of Ministers of the Republic of "
        "Karakalpakstan, of the State Budget of the Republic of Karakalpakstan and reports on "
        "its execution;",
        S['article_text']
    ))
    s.append(Paragraph(
        "16) establishment of state awards and honorary titles of the Republic of Karakalpakstan;",
        S['article_text']
    ))
    s.append(Paragraph(
        "17) calling elections to the Jokargy Kenes of the Republic of Karakalpakstan and to local "
        "representative bodies; formation of the Central Election Commission;",
        S['article_text']
    ))
    s.append(Paragraph(
        "18) submission to the Constitutional Court of the Republic of Uzbekistan of proposals "
        "regarding the conformity of acts of the highest state authorities and administration of "
        "the Republic of Uzbekistan with the Constitution of the Republic of Uzbekistan;",
        S['article_text']
    ))
    s.append(Paragraph(
        "19) exercise of parliamentary oversight and other powers provided for by this Constitution.",
        S['article_text']
    ))

    s.append(art("71",
        "The activities of the Jokargy Kenes of the Republic of Karakalpakstan are carried out in "
        "the manner established by the Constitution and the Rules of Procedure of the Jokargy Kenes "
        "of the Republic of Karakalpakstan."
    ))
    s.append(art("72",
        "A session of the Jokargy Kenes of the Republic of Karakalpakstan is deemed valid if no "
        "fewer than two‑thirds of the total number of deputies participate in its work."
    ))
    s.append(art("73",
        "The Chairperson of the Council of Ministers of the Republic of Karakalpakstan and their "
        "deputies, ministers, chairpersons of state committees, heads of other state administration "
        "bodies, the Chairperson of the Committee of Constitutional Oversight, the Chairperson of "
        "the Court of the Republic of Karakalpakstan, the Chairperson of the Administrative Court "
        "of the Republic of Karakalpakstan, and the Prosecutor of the Republic of Karakalpakstan "
        "ay participate in the sessions of the Jokargy Kenes of the Republic of Karakalpakstan "
        "and its bodies."
    ))
    s.append(art("74",
        "Upon the expiration of its term of office, the Jokargy Kenes of the Republic of "
        "Karakalpakstan continues its activities until the beginning of the work of the newly "
        "elected Jokargy Kenes of the Republic of Karakalpakstan.\n"
        "The first session of the Jokargy Kenes of the Republic of Karakalpakstan after elections "
        "shall be convened by the Central Election Commission no later than two months "
        "after the elections."
    ))
    s.append(art("75",
        "The right of legislative initiative in the Jokargy Kenes of the Republic of Karakalpakstan "
        "belongs to the deputies of the Jokargy Kenes of the Republic of Karakalpakstan, the "
        "Council of Ministers of the Republic of Karakalpakstan, the Committee of Constitutional "
        "Oversight of the Republic of Karakalpakstan, the Court of the Republic of Karakalpakstan, "
        "the Administrative Court of the Republic of Karakalpakstan, and the Prosecutor of the "
        "Republic of Karakalpakstan."
    ))
    s.append(art("76",
        "The Jokargy Kenes of the Republic of Karakalpakstan adopts laws, resolutions, and other "
        "acts. A majority of votes of all deputies of the Jokargy Kenes of the Republic of "
        "Karakalpakstan is required for the adoption of a law.\n"
        "Laws of the Republic of Karakalpakstan acquire legal force after their adoption by the "
        "Jokargy Kenes and their official publication in the manner prescribed by law."
    ))
    s.append(art("77",
        "The Jokargy Kenes of the Republic of Karakalpakstan elects from among its deputies "
        "committees and commissions for legislative work, preliminary review and preparation of "
        "issues submitted for consideration by the Jokargy Kenes of the Republic of Karakalpakstan, "
        "and for monitoring the implementation of laws and other decisions of the Jokargy Kenes of "
        "the Republic of Karakalpakstan.\n"
        "The Jokargy Kenes of the Republic of Karakalpakstan may establish, when necessary, "
        "deputy, audit, and other commissions on a permanent or temporary basis.\n"
        "The powers and procedures of the committees and commissions of the Jokargy Kenes of the "
        "Republic of Karakalpakstan are determined by law."
    ))
    s.append(art("78",
        "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan shall be reimbursed, in "
        "the prescribed manner, for expenses related to their parliamentary activities. Deputies "
        "working in the Jokargy Kenes of the Republic of Karakalpakstan and its bodies on a "
        "permanent basis may not hold any other paid position or engage in entrepreneurial activity "
        "during their term of office."
    ))
    s.append(art("79",
        "A deputy of the Jokargy Kenes of the Republic of Karakalpakstan enjoys immunity. They may "
        "not be subjected to criminal liability, arrest, or administrative penalties imposed by a "
        "court without the consent of the Jokargy Kenes of the Republic of Karakalpakstan."
    ))

    s.append(chapter("CHAPTER XVIII\nTHE CHAIRPERSON OF THE JOKARGY KENES\nOF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art("80",
        "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan is the Head of "
        "the Republic of Karakalpakstan and the highest official of the Republic of Karakalpakstan.\n"
        "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan is elected by the "
        "Jokargy Kenes of the Republic of Karakalpakstan, in agreement with the President of the "
        "Republic of Uzbekistan, from among the deputies of the Jokargy Kenes of the Republic of "
        "Karakalpakstan, by secret ballot for the term of office of the Jokargy Kenes of the "
        "Republic of Karakalpakstan."
    ))
    s.append(art("81",
        "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan:\n"
        "1) ensures interaction between the highest legislative and executive bodies of the Republic "
        "of Karakalpakstan;\n"
        "2) presents reports to the Jokargy Kenes of the Republic of Karakalpakstan on the state "
        "of affairs in the republic and on other important issues;\n"
        "3) organizes the implementation of laws and other decisions of the Oliy Majlis of the "
        "Republic of Uzbekistan, decrees and other acts of the President of the Republic of "
        "Uzbekistan; organizes control over the implementation of laws and resolutions of the "
        "Jokargy Kenes of the Republic of Karakalpakstan;\n"
        "4) submits to the Jokargy Kenes of the Republic of Karakalpakstan candidates for the "
        "election of the Deputy Chairperson of the Jokargy Kenes, chairpersons of committees and "
        "commissions of the Jokargy Kenes of the Republic of Karakalpakstan;\n"
        "5) in agreement with the President of the Republic of Uzbekistan, submits to the Jokargy "
        "Kenes of the Republic of Karakalpakstan a candidate for the position of Chairperson of "
        "the Council of Ministers of the Republic of Karakalpakstan;\n"
        "6) appoints and dismisses the khakims of districts and cities and their deputies, with "
        "subsequent approval by the respective Councils of People’s Deputies;\n"
        "7) submits to the Jokargy Kenes of the Republic of Karakalpakstan, in agreement with the "
        "Presidium of the Jokargy Kenes, candidates for the positions of Chairperson and members "
        "of the Committee of Constitutional Oversight of the Republic of Karakalpakstan;\n"
        "8) submits to the Jokargy Kenes of the Republic of Karakalpakstan, in agreement with the "
        "President of the Republic of Uzbekistan and on the basis of the conclusion of the Supreme "
        "Judicial Council of the Republic of Uzbekistan, candidates for the positions of chairperson "
        "and deputy chairpersons of the Court of the Republic of Karakalpakstan, and the chairperson "
        "and deputy chairperson of the Administrative Court of the Republic of Karakalpakstan;\n"
        "9) submits to the Jokargy Kenes of the Republic of Karakalpakstan, in agreement with the "
        "Presidium of the Jokargy Kenes, a candidate for the position of Chairperson of the State "
        "Committee of the Republic of Karakalpakstan for Environmental Protection and Ecology;\n"
        "10) exercises general leadership over the preparation of issues submitted for consideration "
        "by the Jokargy Kenes, convenes sessions of the Jokargy Kenes, and jointly with the "
        "chairpersons of committees and commissions forms proposals for its agenda;\n"
        "11) organizes the work of the Jokargy Kenes of the Republic of Karakalpakstan and its "
        "Presidium, presides over their sessions, signs the laws of the Republic of Karakalpakstan "
        "and other acts adopted by the Jokargy Kenes of the Republic of Karakalpakstan and its "
        "Presidium, directs and coordinates the activities of the committees and commissions of the "
        "Jokargy Kenes of the Republic of Karakalpakstan;\n"
        "12) submits proposals for state awards of the Republic of Karakalpakstan and the conferment "
        "of honorary titles of the Republic of Karakalpakstan;\n"
        "13) petitions for the pardon of convicted citizens;\n"
        "14) organizes public discussions of draft laws and other important issues of state life;\n"
        "15) xercises other powers provided for by current legislative acts.\n"
        "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan has the right to "
        "submit matters within his competence for consideration by the Presidium of the Jokargy "
        "Kenes of the Republic of Karakalpakstan."
    ))
    s.append(art("82",
        "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan issues directives "
        "on matters within his competence."
    ))
    s.append(art("83",
        "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan may be recalled by "
        "the Jokargy Kenes of the Republic of Karakalpakstan in the event of violation of the "
        "Constitution and laws of the Republic of Karakalpakstan. A decision on recall is adopted "
        "by a majority of no fewer than two‑thirds of the total number of deputies of the Jokargy "
        "Kenes of the Republic of Karakalpakstan, upon the initiative of one‑third of the deputies, "
        "taking into account the conclusion of the Committee of Constitutional Oversight of the "
        "Republic of Karakalpakstan.\n"
        "The powers of the Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan may "
        "be terminated early upon his own request, as well as in the event of inability to perform "
        "his duties due to health or other reasons.\n"
        "In such cases, elections for a new Chairperson of the Jokargy Kenes of the Republic of "
        "Karakalpakstan shall be held within two months."
    ))

    s.append(chapter("CHAPTER XIX\nTHE PRESIDIUM OF THE JOKARGY KENES\nOF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art("84",
        "To organize the work of the Jokargy Kenes of the Republic of Karakalpakstan and t "
        "exercise other powers, the Presidium of the Jokargy Kenes of the Republic of Karakalpakstan "
        "is established.\n"
        "The Presidium of the Jokargy Kenes of the Republic of Karakalpakstan includes the "
        "Chairperson of the Jokargy Kenes, the Deputy Chairperson, the chairpersons of the "
        "committees and commissions of the Jokargy Kenes, and the leaders of party groups in the "
        "Jokargy Kenes of the Republic of Karakalpakstan."
    ))
    s.append(art("85",
        "The Presidium of the Jokargy Kenes of the Republic of Karakalpakstan:\n"
        "1) prepares proposals for the agenda and the procedure of the session of the Jokargy Kenes;\n"
        "2) hears reports from the committees and commissions of the Jokargy Kenes on their work "
        "and information on the implementation of the laws of the Republic of Karakalpakstan and "
        "the decisions of the Jokargy Kenes;\n"
        "3) organizes the planning of legislative work;\n"
        "4) upon the proposal of the Chairperson of the Jokargy Kenes, preliminarily reviews draft "
        "laws and other documents;\n"
        "5) analyzes proposals and comments made by deputies during the session of the Jokargy "
        "Kenes and adopts appropriate decisions on them;\n"
        "6) confers state awards of the Republic of Karakalpakstan and grants honorary titles of "
        "the Republic of Karakalpakstan;\n"
        "7) during the period between sessions of the Jokargy Kenes of the "
        "Republic of Karakalpakstan, upon the submission of the Chairperson of the Council of Ministers of the "
        "Republic of Karakalpakstan, appoints and dismisses the deputy chairpersons of the Council "
        "of Ministers of the Republic of Karakalpakstan and members of the Council of Ministers of "
        "the Republic of Karakalpakstan, establishes and abolishes ministries, state committees, "
        "and other bodies of state administration of the Republic of Karakalpakstan, with subsequent "
        "submission of resolutions on these matters for approval by the Jokargy Kenes of the "
        "Republic of Karakalpakstan;\n"
        "8) appoints and dismisses judges of the courts of the Republic of Karakalpakstan, as well as "
        "chairpersons and judges of inter‑district and district (city) courts of the Republic "
        "of Karakalpakstan;\n"
        "9) submits to the Jokargy Kenes of the Republic of Karakalpakstan, in agreement with the "
        "Prosecutor General of the Republic of Uzbekistan, a candidate for the position of "
        "Prosecutor of the Republic of Karakalpakstan;\n"
        "10) uring the period between sessions, gives consent to bringing a deputy of the Jokargy "
        "Kenes to liability in cases and in the manner prescribed by law, as well as to terminating "
        "their employment contract at the initiative of the employer;\n"
        "11) considers other issues related to the work of the Jokargy Kenes and the effective "
        "exercise of deputies’ powers.\n"
        "The Presidium of the Jokargy Kenes of the Republic of Karakalpakstan issues resolutions "
        "on matters within its competence, which are published in the prescribed manner."
    ))

    s.append(chapter("CHAPTER XX\nTHE COUNCIL OF MINISTERS OF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art("86",
        "The Council of Ministers of the Republic of Karakalpakstan — the Government of the "
        "Republic of Karakalpakstan — is the highest executive and administrative body of state "
        "power of the Republic of Karakalpakstan."
    ))
    s.append(art("87",
        "The Council of Ministers of the Republic of Karakalpakstan is formed by the Jokargy Kenes "
        "of the Republic of Karakalpakstan.\n"
        "The Council of Ministers of the Republic of Karakalpakstan ensures the effective "
        "functioning of the economy, the social and spiritual spheres, and the implementation of "
        "the laws of the Republic of Uzbekistan and other decisions of the Oliy Majlis of the "
        "Republic of Uzbekistan, decrees, resolutions, and orders of the President of the Republic "
        "of Uzbekistan, resolutions and orders of the Cabinet of Ministers of the Republic of "
        "Uzbekistan, the laws of the Republic of Karakalpakstan and other decisions of the Jokargy "
        "Kenes of the Republic of Karakalpakstan, as well as the resolutions of the Presidium of "
        "the Jokargy Kenes of the Republic of Karakalpakstan.\n"
        "The Council of Ministers of the Republic of Karakalpakstan suspends or annuls acts of "
        "state administration bodies of the Republic of Karakalpakstan, as well as acts of district "
        "and city khakims."
    ))
    s.append(art("88",
        "The Council of Ministers of the Republic of Karakalpakstan is headed by a Chairperson "
        "appointed by the Jokargy Kenes of the Republic of Karakalpakstan upon the submission of "
        "the Chairperson of the Jokargy Kenes, agreed with the President of the Republic of "
        "Uzbekistan.\n"
        "The Chairperson of the Council of Ministers of the Republic of Karakalpakstan is, by "
        "virtue of office, a member of the Cabinet of Ministers of the Republic of Uzbekistan.\n"
        "The Chairperson of the Council of Ministers of the Republic of Karakalpakstan:\n"
        "1) directs the activities of the government and takes measures to ensure the effective "
        "exercise of its powers;\n"
        "2) submits to the Jokargy Kenes of the Republic of Karakalpakstan, and between sessions "
        "to the Presidium of the Jokargy Kenes, candidates for appointment and dismissal of deputy "
        "chairpersons of the Council of Ministers and members of the Council of Ministers of the "
        "Republic of Karakalpakstan;\n"
        "3) distributes duties among the deputy chairpersons of the Council of Ministers, with "
        "subsequent approval by the Presidium of the Council of Ministers;\n"
        "4) submits to the Jokargy Kenes of the Republic of Karakalpakstan, and between sessions "
        "to the Presidium of the Jokargy Kenes, proposals on the establishment and abolition of "
        "inistries, state committees, and other bodies of state administration of the Republic of "
        "Karakalpakstan;\n"
        "5) submits to the Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan "
        "candidates for appointment and dismissal of district and city khakims and their deputies;\n"
        "6) presides over meetings of the Council of Ministers and its Presidium;\n"
        "7) ensures collegiality in the work of the Council of Ministers;\n"
        "8) makes decisions on individual issues of state and economic administration that do not "
        "require consideration at meetings of the Council of Ministers or its Presidium;\n"
        "9) exercises other powers assigned to him by law."
    ))
    s.append(art("89",
        "The Council of Ministers of the Republic of Karakalpakstan is responsible and accountable "
        "to the Jokargy Kenes of the Republic of Karakalpakstan.\n"
        "The Council of Ministers of the Republic of Karakalpakstan reports on its activities to "
        "the Jokargy Kenes of the Republic of Karakalpakstan at least once a year.\n"
        "The Council of Ministers of the Republic of Karakalpakstan resigns its powers before the "
        "newly elected Jokargy Kenes of the Republic of Karakalpakstan."
    ))
    s.append(art("90",
        "The Council of Ministers of the Republic of Karakalpakstan, on the basis of and in "
        "execution of the laws of the Republic of Uzbekistan and other decisions of the Oliy Majlis "
        "of the Republic of Uzbekistan, decrees, resolutions, and orders of the President of the "
        "Republic of Uzbekistan, resolutions and orders of the Cabinet of Ministers of the Republic "
        "of Uzbekistan, the laws of the Republic of Karakalpakstan and other decisions of the "
        "Jokargy Kenes of the Republic of Karakalpakstan, and the resolutions of the Presidium of "
        "the Jokargy Kenes of the Republic of Karakalpakstan, issues resolutions and orders that "
        "are mandatory for execution throughout the territory of the Republic of Karakalpakstan."
    ))
    s.append(art("91",
        "The competence of the Council of Ministers of the Republic of Karakalpakstan, the "
        "procedure of its activity, and its relations with other state bodies of the Republic of "
        "Karakalpakstan are determined by the law of the Republic of Karakalpakstan."
    ))

    s.append(chapter("CHAPTER XXI\nFOUNDATIONS OF STATE POWER AT THE LOCAL LEVEL"))
    s.append(art("92",
        "The representative bodies of authority in districts and cities (except for cities of "
        "district subordination) are the Councils of People's Deputies, headed by khokims, which "
        "resolve issues within their competence based on the interests of the state and citizens.."
    ))
    s.append(art("93",
        "The jurisdiction of local authorities includes:\n"
        "Ensuring the rule of law, public order, and the security of citizens; issues of economic, "
        "social, and cultural development of the territories; formation and execution of the local "
        "budget, establishment of local taxes and fees, and formation of extra-budgetary funds; "
        "management of local municipal services; environmental protection; ensuring the registration "
        "of acts of civil status; adoption of normative acts, and other powers not contradicting "
        "the Constitution and the legislation of the Republic of Karakalpakstan."
    ))
    s.append(art("94",
        "Local authorities implement the laws of the Republic of Uzbekistan and other decisions of "
        "the Oliy Majlis of the Republic of Uzbekistan, decrees, resolutions, and orders of the "
        "President of the Republic of Uzbekistan, resolutions and orders of the Cabinet of Ministers "
        "of the Republic of Uzbekistan, laws of the Republic of Karakalpakstan and other decisions "
        "of the Jokargy Kenes of the Republic of Karakalpakstan, resolutions of the Presidium of "
        "the Jokargy Kenes of the Republic of Karakalpakstan, resolutions and orders of the Council "
        "of Ministers of the Republic of Karakalpakstan, and participate in the discussion of "
        "issues of republic and local significance.\n"
        "Decisions of superior bodies, adopted within the limits of their granted competences, are "
        "binding for execution by subordinate bodies.\n"
        "The term of office for the Councils of People's Deputies and khokims is 5 years."
    ))
    s.append(art("95",
        "The representative and executive authority in the respective territory is headed by the "
        "khokim of the district or city."
    ))
    s.append(art("96",
        "Khokims of districts and cities, and their deputies, are appointed and dismissed from "
        "office by the Chairman of the Jokargy Kenes of the Republic of Karakalpakstan upon the "
        "recommendation of the Chairman of the Council of Ministers of the Republic of Karakalpakstan "
        "and are approved by the relevant Council of People's Deputies."
    ))
    s.append(art("97",
        "The khokim of a district or city exercises their powers based on the principles of "
        "individual leadership and bears personal responsibility for the decisions and actions of "
        "the bodies they lead.\n"
        "The khokim of a district or city presents reports to the relevant Kengash of People's "
        "Deputies on the most important and pressing issues of the socio-economic development of "
        "the district or city, upon which the Kengash of People's Deputies adopts relevant "
        "decisions.\n"
        "The organization of activities, the scope of powers of khokims and local Councils of "
        "People's Deputies, and the procedure for elections to local Councils of People's Deputies "
        "are regulated by law."
    ))
    s.append(art("98",
        "Within the limits of the powers granted to them, the khokim adopts decisions that are "
        "binding for execution by all enterprises, institutions, organizations, associations, as "
        "well as officials and citizens in the respective territory."
    ))
    s.append(art("99",
        "The bodies of self-government in settlements, auls, and city makhallas are the citizens' "
        "assemblies, which elect a chairperson (aksakal).\n"
        "The procedure for elections, the organization of activities, and the scope of powers of "
        "self-government bodies are regulated by law."
    ))

    s.append(chapter("CHAPTER XXII\nTHE JUDICIAL POWER OF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art("100",
        "The judicial power in the Republic of Karakalpakstan operates independently of the "
        "legislative and executive powers, political parties, and other public associations."
    ))
    s.append(art("101",
        "The judicial system of the Republic of Karakalpakstan consists of the Court of the "
        "Republic of Karakalpakstan, the Administrative Court of the Republic of Karakalpakstan, "
        "inter-district, district (city) courts for civil cases, district and city courts for "
        "criminal cases, inter-district economic courts, and inter-district administrative courts.\n"
        "The organization and procedure of court activities are determined by law.\n"
        "The creation of extraordinary courts is not permitted."
    ))
    s.append(art("102",
        "The Court of the Republic of Karakalpakstan is the supreme body of judicial power in the "
        "sphere of civil, criminal, and economic legal proceedings."
    ))

    # Articles 103 and 104 — EXCLUDED in red
    s.append(art_excluded("103"))
    s.append(art_excluded("104"))

    s.append(art("105",
        "The Administrative Court of the Republic of Karakalpakstan is the highest judicial "
        "authority in the consideration of administrative disputes arising from public‑law relations "
        "based on complaints and applications, and has the right to supervise the judicial "
        "activities of inter‑district administrative courts."
    ))
    s.append(art("106",
        "Judges are independent and subject only to the law. Any interference in the activities of "
        "udges in the administration of justice is inadmissible and entails liability under the "
        "law.\n"
        "The inviolability of judges is guaranteed by law.\n"
        "Judges may not be senators or deputies of representative bodies of state power.\n"
        "Judges may not be members of political parties, participate in political movements, or "
        "hold any other paid position except for scientific or teaching work.\n"
        "Before the expiration of their term of office, a judge may be dismissed only on the "
        "grounds specified by law."
    ))
    s.append(art("107",
        "Court proceedings in all courts are open. Hearings in closed sessions are permitted only "
        "in cases established by law."
    ))
    s.append(art("108",
        "Acts of judicial authority are binding on all state bodies, public associations, "
        "enterprises, institutions, organizations, officials, and citizens."
    ))
    s.append(art("109",
        "Legal proceedings in the Republic of Karakalpakstan are conducted in the Karakalpak or "
        "Uzbek languages, or in the language of the majority population of the given locality. "
        "Persons involved in a case who do not know the language of the proceedings are guaranteed "
        "the right to fully familiarize themselves with the case materials, to participate in "
        "judicial actions through an interpreter, and to speak in court in their native language."
    ))
    s.append(art("110",
        "The accused is guaranteed the right to defense. The right to professional legal assistance "
        "is guaranteed at any stage of investigation and trial. The bar provides legal assistance "
        "to citizens, enterprises, organizations, and institutions. The organization and procedure "
        "of the bar’s activities are determined by law."
    ))

    s.append(chapter("CHAPTER XXIII\nELECTORAL SYSTEM"))
    s.append(art("111",
        "Citizens of the Republic of Karakalpakstan have the right to elect and be elected to "
        "representative bodies. Each voter has one vote. The right to vote, equality, and freedom "
        "of expression of will are guaranteed by law.\n"
        "Elections to the Jokargy Kenes of the Republic of Karakalpakstan and to representative "
        "bodies of state power of districts and cities are held in the year of expiration of their "
        "constitutional term of office — on the first Sunday of the third decade of October. "
        "Elections are conducted on the basis of universal, equal, and direct suffrage by secret "
        "ballot. Citizens of the Republic of Karakalpakstan who have reached the age of 18 have "
        "the right to vote.\n"
        "Citizens declared legally incapable by a court, as well as persons held in places of "
        "deprivation of liberty under a court sentence, may not be elected.\n"
        "Citizens declared legally incapable by a court, as well as persons held in places of "
        "deprivation of liberty under a court sentence for committing serious and especially serious "
        "crimes, do not participate in elections. In all other cases, direct or indirect restriction "
        "of citizens’ electoral rights is not permitted.\n"
        "A citizen of the Republic of Karakalpakstan may not simultaneously be a deputy in more "
        "than two representative bodies of state power.\n"
        "To organize and conduct elections to the Jokargy Kenes of the Republic of Karakalpakstan, "
        "as well as the referendum of the Republic of Karakalpakstan, the Central Election "
        "Commission of the Republic of Karakalpakstan is established by the Jokargy Kenes of the "
        "Republic of Karakalpakstan. Its fundamental principles are independence, legality, "
        "collegiality, transparency, and fairness.\n"
        "The Central Election Commission of the Republic of Karakalpakstan operates on a permanent "
        "basis and in its activities is guided by the Constitution of the Republic of Karakalpakstan, "
        "the laws on elections and the referendum of the Republic of Karakalpakstan, and other "
        "legislative acts.\n"
        "Members of the Central Election Commission of the Republic of Karakalpakstan are elected "
        "by the Jokargy Kenes of the Republic of Karakalpakstan upon the recommendation of district "
        "and city Councils of People's Deputies.\n"
        "The Chairperson of the Central Election Commission of the Republic of Karakalpakstan is "
        "elected from among its members upon the submission of the Chairperson of the Jokargy Kenes "
        "of the Republic of Karakalpakstan at a meeting of the Commission.\n"
        "The procedure for conducting elections is determined by law."
    ))

    s.append(chapter("CHAPTER XXIV\nCONSTITUTIONAL OVERSIGHT"))
    s.append(art("112",
        "Constitutional oversight in the Republic of Karakalpakstan is carried out by the Committee "
        "of Constitutional Oversight of the Republic of Karakalpakstan.\n"
        "The Committee of Constitutional Oversight of the Republic of Karakalpakstan is elected by "
        "the Jokargy Kenes of the Republic of Karakalpakstan from among specialists in the fields "
        "of politics and law, and consists of a chairperson, a deputy chairperson, and members of "
        "the Committee. The term of office of those elected to the Committee of Constitutional "
        "Oversight of the Republic of Karakalpakstan is five years.\n"
        "The performance of duties by the chairperson, deputy chairperson, and members of the "
        "Committee of Constitutional Oversight of the Republic of Karakalpakstan is incompatible "
        "with a deputy mandate.\n"
        "Persons elected to the Committee of Constitutional Oversight of the Republic of "
        "Karakalpakstan may not simultaneously be members of bodies whose acts are subject to the "
        "Committee's oversight.\n"
        "Persons elected to the Committee of Constitutional Oversight of the Republic of "
        "Karakalpakstan, in performing their duties, are independent and subject only to the "
        "Constitution of the Republic of Karakalpakstan."
    ))
    s.append(art("113",
        "The Committee of Constitutional Oversight of the Republic of Karakalpakstan:\n"
        "1) upon instruction of the Jokargy Kenes of the Republic of Karakalpakstan, submits to it "
        "conclusions on the conformity of draft laws of the Republic of Karakalpakstan and other "
        "acts submitted for consideration by the Jokargy Kenes of the Republic of Karakalpakstan with "
        "the Constitution of the Republic of Karakalpakstan;\n"
        "2) upon proposals from no fewer than one‑fifth of the deputies of the Jokargy Kenes of "
        "the Republic of Karakalpakstan or from the Chairperson of the Jokargy Kenes of the Republic "
        "of Karakalpakstan, submits to the Jokargy Kenes conclusions on the conformity of laws of the "
        "Republic of Karakalpakstan and other acts adopted by the Jokargy "
        "Kenes with the Constitution of the Republic of Karakalpakstan;\n"
        "3) pon instruction of the Jokargy Kenes of the Republic of Karakalpakstan, submits to "
        "it conclusions on the conformity of the resolutions of the Presidium and the orders of "
        "the Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan with the "
        "Constitution and laws of the Republic of Karakalpakstan;\n"
        "4) upon instruction of the Jokargy Kenes of the Republic of Karakalpakstan, or upon proposals "
        "from no fewer than one‑fifth of the deputies of the Jokargy Kenes of the Republic of Karakalpakstan, "
        "or from the Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan, submits to the "
        "Jokargy Kenes conclusions on the conformity of the resolutions and orders of the Council of "
        "Ministers of the Republic of Karakalpakstan with the Constitution and "
        "laws of the Republic of Karakalpakstan.\n"
        "The Committee of Constitutional Oversight of the Republic of Karakalpakstan also has "
        "the right, on its own initiative, to submit conclusions on the conformity of acts of the"
        "highest bodies of state power and administration of the Republic of Karakalpakstan with "
        "the Constitution and laws of the Republic of Karakalpakstan.\n"
        "A conclusion of the Committee may be rejected only by a decision of the Jokargy Kenes of "
        "the Republic of Karakalpakstan adopted by two‑thirds of the total number of deputies of "
        "the Jokargy Kenes of the Republic of Karakalpakstan.\n"
        "The organization and procedure of the activities of the Committee of Constitutional "
        "Oversight of the Republic of Karakalpakstan are determined by the Law of the Republic of "
        "Karakalpakstan on Constitutional Oversight."

    ))

    s.append(chapter("CHAPTER XXV\nPROSECUTORIAL OVERSIGHT"))
    s.append(art("114",
        "Supervision over the precise and uniform execution of laws on the territory of "
        "the Republic of Karakalpakstan shall be exercised by the Procurator of the Republic of "
        "Karakalpakstan and procurators subordinate to him."
    ))
    s.append(art("115",
        "The Procurator of the Republic of Karakalpakstan shall be appointed and dismissed by the "
        "Jokargy Kenes of the Republic of Karakalpakstan in coordination with the Procurator "
        "General of the Republic of Uzbekistan.\n"
        "Procurators of districts and cities shall be appointed and dismissed by the Procurator "
        "General of the Republic of Uzbekistan upon the recommendation of the Procurator of the "
        "Republic of Karakalpakstan.\n"
        "The term of office for the Procurator of the Republic of Karakalpakstan and the "
        "procurators of districts and cities shall be five years."
    ))
    s.append(art("116",
        "The bodies of the Procuracy of the Republic of Karakalpakstan shall exercise "
        "their powers independently of any state bodies, public associations, and officials, being "
        "subordinate only to the law.\n"
        "For the duration of their term of office, procurators shall suspend their membership in "
        "political parties and other public associations pursuing political goals.\n"
        "The organization, powers, and procedure for the activities of the procuracy bodies "
        "shall be determined by law."
    ))
    s.append(art("117",
        "The creation and functioning of private or cooperative organizations, public associations, "
        "and their subdivisions independently performing operational-search, investigative, and "
        "other special functions for combating crime is prohibited on the territory of the Republic "
        "of Karakalpakstan.\n"
        "Public associations and citizens may assist law enforcement agencies in protecting the "
        "rule of law, public order, and the rights and freedoms of citizens."
    ))

    s.append(chapter("CHAPTER XXVI\nFINANCE AND BUDGET"))
    s.append(art("118",
        "The State Budget of the Republic of Karakalpakstan shall include the republican budget "
        "and local budgets."
    ))
    s.append(art("119",
        "The delimitation of revenues and expenditures of the State Budget of the Republic of "
        "Karakalpakstan between the republican and local budgets shall be determined by the "
        "legislation of the Republic of Karakalpakstan."
    ))

    # SECTION SIX
    s.append(PageBreak())
    s.append(section("SECTION SIX\nPROCEDURE FOR AMENDING THE CONSTITUTION"))
    s.append(hr_blue())

    s.append(art("120",
        "Amendments to the Constitution of the Republic of Karakalpakstan shall be introduced by "
        "laws adopted by a majority of at least two-thirds of the total number of deputies of the "
        "Jokargy Kenes or through a referendum of the Republic of Karakalpakstan."
    ))
    s.append(art("121",
        "The Jokargy Kenes of the Republic of Karakalpakstan shall have the right to adopt a law "
        "on amendments and additions to the Constitution within six months after the submission of "
        "a corresponding proposal. If the Jokargy Kenes of the Republic of Karakalpakstan rejects "
        "a proposal to amend the Constitution, it may be reintroduced no earlier than one year "
        "later."
    ))

    # Final page
    s.append(PageBreak())
    s.append(Spacer(1, 3*cm))
    s.append(HRFlowable(width="60%", thickness=2, color=GOLD,
                        hAlign='CENTER', spaceAfter=20))
    s.append(Paragraph(
        "CONSTITUTION OF THE REPUBLIC OF KARAKALPAKSTAN",
        S['cover_republic']
    ))
    s.append(Paragraph(
        "Adopted April 9, 1993 · Current edition",
        S['cover_adopted']
    ))
    s.append(Spacer(1, 0.5*cm))
    s.append(Paragraph("www.karakalpakvoice.org", S['cover_site']))
    s.append(Paragraph(
        "Karakalpakstan — a sovereign republic · Archival document · " + YEAR,
        S['cover_site']
    ))
    s.append(HRFlowable(width="60%", thickness=2, color=GOLD,
                        hAlign='CENTER', spaceBefore=20))
    return s

# — Build PDF —————————————————————————————————————————————————————————————
def build_pdf(output_path="constitution_2026_en.pdf"):
    doc = BaseDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
        title=f"Constitution of the Republic of Karakalpakstan {YEAR}",
        author="www.karakalpakvoice.org",
        subject="Constitution of the Republic of Karakalpakstan",
        creator="www.karakalpakvoice.org"
    )
    doc.addPageTemplates([make_page_template(doc)])

    story = []
    story += build_cover()
    story += build_content()

    doc.build(story)
    print(f"✅ PDF created: {output_path}")

if __name__ == "__main__":
    build_pdf()