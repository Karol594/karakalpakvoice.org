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

# — Styles ————————————————————————————————————————————————————————————————
# — Стили (Усы жерге 'cover_amendments' стилин қостық) ——————————————————————
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
        # МҮҚАБАДАҒЫ ӨЗГЕРИСЛЕР ТЕКСТИНИҢ СТИЛИ:
        'cover_amendments': ParagraphStyle(
            'cover_amendments', fontName='DejaVuIt', fontSize=8.5,
            textColor=GRAY, alignment=TA_CENTER, spaceAfter=6, leading=12),
        'cover_year': ParagraphStyle(
            'cover_year', fontName='DejaVuBold', fontSize=16,
            textColor=LIGHT_BLUE, alignment=TA_CENTER, spaceAfter=6, leading=20),
        'cover_site': ParagraphStyle(
            'cover_site', fontName='DejaVuSans', fontSize=9,
            textColor=GRAY, alignment=TA_CENTER, spaceAfter=2, leading=12),
        'cover_link': ParagraphStyle(
            'cover_link', fontName='DejaVuSans', fontSize=9,
            textColor=colors.HexColor('#1a4a7a'), alignment=TA_CENTER, spaceAfter=2, leading=12),
        'preamble_title': ParagraphStyle(
            'preamble_title', fontName='DejaVuBold', fontSize=13,
            textColor=DARK_BLUE, alignment=TA_CENTER, spaceBefore=14, spaceAfter=8, leading=18),
        'preamble_text': ParagraphStyle(
            'preamble_text', fontName='DejaVu', fontSize=10,
            textColor=colors.black, alignment=TA_JUSTIFY, spaceAfter=8, leading=15),
        'section_title': ParagraphStyle(
            'section_title', fontName='DejaVuBold', fontSize=12,
            textColor=DARK_BLUE, alignment=TA_CENTER, spaceBefore=16, spaceAfter=6, leading=16),
        'chapter_title': ParagraphStyle(
            'chapter_title', fontName='DejaVuBold', fontSize=11,
            textColor=MID_BLUE, alignment=TA_CENTER, spaceBefore=12, spaceAfter=5, leading=15),
        'article_title': ParagraphStyle(
            'article_title', fontName='DejaVuBold', fontSize=10,
            textColor=DARK_BLUE, alignment=TA_LEFT, spaceBefore=8, spaceAfter=3, leading=14),
        'article_text': ParagraphStyle(
            'article_text', fontName='DejaVu', fontSize=10,
            textColor=colors.black, alignment=TA_JUSTIFY, spaceAfter=5, leading=15),
    }

S = make_styles()

# — Header / Footer with clickable link ———————————————————————————————————
def make_page_template(doc):
    def header_footer(canvas, doc):
        canvas.saveState()
        w, h = PAGE_W, PAGE_H

        # Жоқарғы сызық (Header)
        canvas.setStrokeColor(LIGHT_BLUE)
        canvas.setLineWidth(1.2)
        canvas.line(MARGIN, h - MARGIN + 0.4*cm, w - MARGIN, h - MARGIN + 0.4*cm)

        canvas.setFont('DejaVuSans', 8)
        canvas.setFillColor(MID_BLUE)
        canvas.drawString(MARGIN, h - MARGIN + 0.6*cm,
                          "CONSTITUTION OF THE REPUBLIC OF KARAKALPAKSTAN")
        canvas.drawRightString(w - MARGIN, h - MARGIN + 0.6*cm, "YEAR " + YEAR)

        # Төменги сызық (Footer)
        canvas.setStrokeColor(LIGHT_BLUE)
        canvas.setLineWidth(0.8)
        canvas.line(MARGIN, MARGIN - 0.3*cm, w - MARGIN, MARGIN - 0.3*cm)

        canvas.setFont('DejaVuSans', 8)
        canvas.setFillColor(GRAY)
        canvas.drawCentredString(w / 2, MARGIN - 0.55*cm, str(doc.page))

        # Clickable link in footer (www.karakalpakvoice.org)
        site_text = "www.karakalpakvoice.org"
        canvas.setFillColor(colors.HexColor('#1a4a7a')) # Силтеме түси
        text_width = canvas.stringWidth(site_text, 'DejaVuSans', 8)
        x_start = w - MARGIN - text_width
        y_pos   = MARGIN - 0.55*cm
        
        canvas.drawString(x_start, y_pos, site_text)
        # Силтемени басылатуғын етиў (Link area)
        canvas.linkURL("https://www.karakalpakvoice.org",
                       (x_start, y_pos - 2, x_start + text_width, y_pos + 8),
                       relative=0)
        canvas.restoreState()

    frame = Frame(MARGIN, MARGIN, PAGE_W - 2*MARGIN, PAGE_H - 2*MARGIN, id='main')
    return PageTemplate(id='main', frames=[frame], onPage=header_footer)

# — Cover ————————————————————————————————————————————————————————————————
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
    s.append(Paragraph("REPUBLIC OF KARAKALPAKSTAN", S['cover_republic']))
    s.append(Spacer(1, 0.3*cm))
    s.append(Paragraph("CONSTITUTION", S['cover_title']))
    s.append(Spacer(1, 0.3*cm))
    s.append(HRFlowable(width="60%", thickness=1.5, color=LIGHT_BLUE,
                         hAlign='CENTER', spaceAfter=8))
    s.append(Paragraph(
        "OF THE TWELFTH CONVOCATION OF THE SUPREME COUNCIL OF THE REPUBLIC OF KARAKALPAKSTAN<br/><br/>"
        "ADOPTED AT THE TWELFTH SESSION ON APRIL 9, 1993",
        S['cover_adopted']))
    s.append(Spacer(1, 0.4*cm))

    # — AMENDMENTS TEXT (ENGLISH) —
    amendments_en = (
        "(With amendments and additions introduced at the fifteenth session of the twelfth convocation of the Supreme Council of the Republic of Karakalpakstan on February 26, 1994, "
        "at the thirteenth session of the Jokargy Kenes of the Republic of Karakalpakstan of the first convocation on October 31, 1995, "
        "at the thirteenth session of the Jokargy Kenes of the Republic of Karakalpakstan of the first convocation on December 15, 1997, "
        "at the twelfth session of the Jokargy Kenes of the Republic of Karakalpakstan of the second convocation on November 12, 2003, "
        "at the fifteenth session of the Jokargy Kenes of the Republic of Karakalpakstan on June 27, 2014, "
        "at the twenty-sixth session of the Jokargy Kenes of the Republic of Karakalpakstan on June 29, 2019, "
        "and at the twenty-ninth session of the Jokargy Kenes of the Republic of Karakalpakstan on December 16, 2019)"
    )
    s.append(Paragraph(amendments_en, S['cover_amendments']))

    # — YEAR & SITE INFO —
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
    s.append(Paragraph("Karakalpakstan — a sovereign republic | Archival document",
                        S['cover_site']))
    s.append(PageBreak())
    return s

# — Helpers ——————————————————————————————————————————————————————————————
def art(num, text):
    items = [Paragraph("Article " + str(num) + ".", S['article_title'])]
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

# — Content ——————————————————————————————————————————————————————————————
def build_content():
    s = []

    s.append(Paragraph("PREAMBLE", S['preamble_title']))
    s.append(hr_gold())
    s.append(Paragraph(
        "The people of the Republic of Karakalpakstan, solemnly proclaiming their commitment to "
        "the principles of human rights and state sovereignty, realizing their high responsibility "
        "before present and future generations, relying on the historical experience of developing "
        "Karakalpak statehood, affirming their loyalty to the ideas of democracy and social "
        "justice, recognizing the supremacy of universally accepted norms of international law, "
        "striving to ensure a decent life for the citizens of the republic, setting as their goal "
        "the establishment of a humane, democratic, law-governed state, and ensuring civil peace "
        "and national harmony, through their fully authorized representatives adopt this "
        "Constitution of the Republic of Karakalpakstan.",
        S['preamble_text']))

    # SECTION ONE
    s.append(PageBreak())
    s.append(section("FIRST SECTION\nFUNDAMENTAL PRINCIPLES"))
    s.append(hr_blue())

    s.append(chapter("CHAPTER I\nSTATE SOVEREIGNTY"))
    s.append(art(1,
        "Karakalpakstan is a sovereign democratic republic within the Republic of Uzbekistan. "
        "The names of the state 'Republic of Karakalpakstan' and 'Karakalpakstan' are equivalent.\n"
        "The mutual relations between the Republic of Uzbekistan and the Republic of Karakalpakstan "
        "are regulated by treaties and agreements concluded between the Republic of Uzbekistan and "
        "the Republic of Karakalpakstan within the framework of the Constitution of the Republic "
        "of Uzbekistan.\n"
        "The Republic of Karakalpakstan has the right to secede from the Republic of Uzbekistan "
        "on the basis of a general referendum of the people of Karakalpakstan."))
    s.append(art(2,
        "The state expresses the will of the people and serves its interests. State bodies and "
        "officials are accountable to society and citizens."))
    s.append(art(3,
        "The Republic of Karakalpakstan independently resolves issues of "
        "administrative-territorial structure, determines the system of bodies of state power "
        "and administration, and conducts a policy consistent with the policy of the Republic "
        "of Uzbekistan.\n"
        "The territory and borders of the Republic of Karakalpakstan are inviolable and may not "
        "be changed or divided."))
    s.append(art(4,
        "The Karakalpak language and the Uzbek language shall be the state languages of the "
        "Republic of Karakalpakstan. The Republic of Karakalpakstan shall ensure respect for the "
        "languages, customs, and traditions of the nationalities and peoples residing within its "
        "territory and create conditions for their development."))
    s.append(art(5,
        "The Republic of Karakalpakstan shall have its own state symbols — flag, emblem, and "
        "anthem — approved by law."))
    s.append(art(6, "The capital of the Republic of Karakalpakstan is the city of Nukus."))

    s.append(chapter("CHAPTER II\nSOVEREIGNTY OF THE PEOPLE"))
    s.append(art(7,
        "The people shall be the sole source of state power.\n"
        "State power in the Republic of Karakalpakstan shall be exercised in the interest of the "
        "people solely by the bodies authorized for this purpose through the Constitution of the "
        "Republic of Karakalpakstan and the laws adopted on its basis.\n"
        "The usurpation of state power, the suspension or termination of the activities of "
        "government bodies in a manner not provided for by the Constitution, and the creation of "
        "new or parallel structures of power shall be considered unconstitutional actions and "
        "shall entail liability according to the law."))
    s.append(art(8,
        "The people of Karakalpakstan, regardless of nationality, shall constitute the citizens "
        "of the Republic of Karakalpakstan."))
    s.append(art(9,
        "The most significant issues of social and state life shall be submitted for public "
        "discussion and put to a popular vote (referendum). The procedure for holding a "
        "referendum shall be established by law."))
    s.append(art(10,
        "Only the Jokargy Kenes of the Republic, elected by the people of Karakalpakstan, may "
        "act on their behalf. No part of society, political party, public association, movement, "
        "or individual person may act on behalf of the people of Karakalpakstan."))
    s.append(art(11,
        "The system of state power in the Republic of Karakalpakstan is based on the principle "
        "of the separation of powers into legislative, executive, and judicial branches."))
    s.append(art(12,
        "Social life in the Republic of Karakalpakstan shall develop on the basis of a diversity "
        "of political institutions, ideologies, and opinions.\n"
        "No ideology may be established as an official state ideology."))
    s.append(art(13,
        "In the Republic of Karakalpakstan, democracy is based on universal human principles, "
        "according to which the person, their life, freedom, honor, dignity, and other "
        "inalienable rights are the highest value.\n"
        "Democratic rights and freedoms are protected by the Constitution and laws."))
    s.append(art(14,
        "The State carries out its activities on the principles of social justice and legality, "
        "pursuing the interests of the well-being of the human being and society."))

    s.append(chapter("CHAPTER III\nSUPREMACY OF THE CONSTITUTION AND THE LAW"))
    s.append(art(15,
        "In the Republic of Karakalpakstan, the unconditional supremacy of the Constitutions and "
        "laws of the Republic of Uzbekistan and the Republic of Karakalpakstan is recognized. "
        "The State, its bodies, officials, public associations, and citizens shall act in "
        "accordance with the Constitution and the laws."))
    s.append(art(16,
        "None of the provisions in this Constitution shall be interpreted to the detriment of "
        "the rights and interests of the Republic of Karakalpakstan. No law or other normative "
        "legal act may contradict the norms and principles of the Constitution."))

    s.append(chapter("CHAPTER IV\nFOREIGN POLICY OF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art(17,
        "International scientific, cultural, and foreign economic relations of the Republic of "
        "Karakalpakstan are carried out in accordance with the laws of the Republic of Uzbekistan "
        "and the Republic of Karakalpakstan."))

    # SECTION TWO
    s.append(PageBreak())
    s.append(section("PART TWO\nFUNDAMENTAL RIGHTS, FREEDOMS, AND DUTIES\nOF THE HUMAN BEING AND THE CITIZEN"))
    s.append(hr_blue())

    s.append(chapter("CHAPTER V\nGENERAL PROVISIONS"))
    s.append(art(18,
        "All citizens of the Republic of Karakalpakstan possess equal rights and freedoms and "
        "are equal before the law, regardless of gender, race, nationality, language, religion, "
        "social origin, beliefs, personal or social status. Privileges may be established only "
        "by law and must comply with the principles of social justice."))
    s.append(art(19,
        "The citizen of the Republic of Karakalpakstan and the state are bound by mutual rights "
        "and mutual responsibility. The rights and freedoms of citizens as established in the "
        "Constitution and laws are inviolable, and no one has the right to deprive or restrict "
        "them without a court decision."))
    s.append(art(20,
        "The exercise of rights and freedoms by a citizen must not violate the lawful interests "
        "and freedoms of other persons, the state, and society."))

    s.append(chapter("CHAPTER VI\nCITIZENSHIP"))
    s.append(art(21,
        "In accordance with the establishment of a single citizenship in the Republic of "
        "Uzbekistan, every citizen of the Republic of Karakalpakstan is a citizen of the "
        "Republic of Uzbekistan. The grounds and procedure for acquiring and losing citizenship "
        "are determined by the Law on Citizenship of the Republic of Uzbekistan. Foreign "
        "citizens and stateless persons present on the territory of the Republic of "
        "Karakalpakstan are ensured rights and freedoms in accordance with the norms of "
        "international law. They shall perform the duties established by the Constitution and "
        "laws of the Republic of Karakalpakstan and the international treaties of the Republic "
        "of Uzbekistan."))

    s.append(chapter("CHAPTER VII\nPERSONAL RIGHTS AND FREEDOMS"))
    s.append(art(22,
        "The right to life is an inseparable right of every person. Encroachment upon it is "
        "the gravest crime."))
    s.append(art(23,
        "Every person has the right to freedom and personal inviolability. No one shall be "
        "arrested or held in custody except on the basis of the law."))
    s.append(art(24,
        "Every person accused of committing a crime is considered innocent until their guilt is "
        "proven in a public court proceeding and established in a lawful manner, during which "
        "they are provided with opportunities for their defense. No one may be subjected to "
        "torture, violence, or other cruel treatment or relations that humiliate human dignity. "
        "No one shall be subjected to medical or scientific experiments without their consent."))
    s.append(art(25,
        "Every person has the right to protection from encroachment on their honor and dignity, "
        "from interference in their private life, and has the right to the inviolability of "
        "their home. No one has the right to enter a home, conduct a search or inspection, or "
        "violate the privacy of correspondence and telephone conversations, except in cases and "
        "procedures provided for by law."))
    s.append(art(26,
        "A citizen of the Republic of Karakalpakstan, by virtue of being a citizen of the "
        "Republic of Uzbekistan, has the right to move freely throughout the territory of the "
        "Republic of Uzbekistan, as well as to enter and exit the Republic of Uzbekistan, "
        "except in cases restricted by law."))
    s.append(art(27,
        "Everyone shall have the right to freedom of thought, speech, and conviction.\n"
        "Everyone shall have the right to seek, receive, and disseminate any information, "
        "except for information directed against the existing constitutional order and other "
        "restrictions provided by law.\n"
        "Freedom of opinion and expression may be restricted by law concerning state or other "
        "secrets."))
    s.append(art(28,
        "All state bodies, public associations, and officials of the Republic of Karakalpakstan "
        "are obliged to provide citizens with the opportunity to familiarize themselves with "
        "documents, decisions, and other materials relating to their rights and interests."))
    s.append(art(29,
        "Freedom of conscience is guaranteed for all; everyone has the right to profess any "
        "religion or none at all. The forced imposition of religious views is impermissible."))

    s.append(chapter("CHAPTER VIII\nPOLITICAL RIGHTS"))
    s.append(art(30,
        "Citizens of the Republic of Karakalpakstan have the right to participate in the "
        "management of public and state affairs both directly and through their representatives. "
        "Such participation is carried out through self-government, the holding of referendums, "
        "and the democratic formation of state bodies."))
    s.append(art(31,
        "Citizens have the right to exercise their social activity in the form of rallies, "
        "meetings, and demonstrations in accordance with the laws of the Republic of "
        "Karakalpakstan. Authorities have the right to suspend or prohibit these events solely "
        "for security reasons."))
    s.append(art(32,
        "Citizens of the Republic of Karakalpakstan have the right to unite in trade unions, "
        "political parties, and other public associations, and to participate in mass movements.\n"
        "No one may infringe upon the rights, freedoms, and dignity of persons constituting an "
        "opposition minority in political parties, public associations, mass movements, or "
        "representative bodies of authority."))
    s.append(art(33,
        "Every person has the right, individually or jointly with others, to submit petitions, "
        "proposals, and complaints to the relevant state bodies, institutions, or "
        "representatives of the people.\n"
        "Petitions, proposals, and complaints must be reviewed within the procedure and time "
        "limits established by law."))

    s.append(chapter("CHAPTER IX\nECONOMIC AND SOCIAL RIGHTS"))
    s.append(art(34,
        "Every person has the right to property. The confidentiality of bank deposits and the "
        "right of inheritance are guaranteed by law."))
    s.append(art(35,
        "Every person has the right to work, to freely choose employment, to work under fair "
        "conditions, and to be protected from unemployment in the manner prescribed by law.\n"
        "Forced labor is prohibited except in cases of serving a sentence imposed by a court "
        "or in other circumstances provided by law."))
    s.append(art(36,
        "Employees have the right to paid rest. The duration of working hours and paid leave "
        "is determined by law."))
    s.append(art(37,
        "Every person has the right to social security in old age, in case of loss of ability "
        "to work, loss of a breadwinner, and in other cases provided by law.\n"
        "Pensions, allowances, and other types of social assistance may not be lower than the "
        "officially established minimum necessary for living."))
    s.append(art(38, "Every person has the right to qualified medical care."))
    s.append(art(39,
        "Every person has the right to education.\n"
        "The state guarantees free general education. Schooling is under state supervision."))
    s.append(art(40,
        "Every person is guaranteed freedom of scientific and technical creativity and the "
        "right to benefit from cultural achievements.\n"
        "The state supports the cultural, scientific, and technical development of society."))

    s.append(chapter("CHAPTER X\nGUARANTEES OF HUMAN RIGHTS AND FREEDOMS"))
    s.append(art(41,
        "The State shall ensure the rights and freedoms of citizens as established by the "
        "Constitution and laws."))
    s.append(art(42,
        "Every person is guaranteed the right to judicial protection of their rights and "
        "freedoms, and the right to appeal to court against the unlawful actions of state "
        "bodies, officials, and public associations."))
    s.append(art(43,
        "The rights of minors, persons with disabilities, and elderly persons living alone "
        "shall be protected by the State."))
    s.append(art(44, "Women and men shall have equal rights."))

    s.append(chapter("CHAPTER XI\nDUTIES OF CITIZENS"))
    s.append(art(45, "All citizens shall perform the duties established for them by the Constitution."))
    s.append(art(46,
        "Citizens are obliged to observe the Constitution and laws, and to respect the rights, "
        "freedoms, honor, and dignity of others."))
    s.append(art(47,
        "Citizens are obliged to preserve the historical, spiritual, and cultural heritage of "
        "the people of Karakalpakstan.\n"
        "Cultural monuments shall be protected by the State."))
    s.append(art(48, "Citizens are obliged to treat the natural environment with care."))
    s.append(art(49, "Citizens are obliged to pay taxes and local fees established by law."))
    s.append(art(50,
        "The defense of the Republic of Uzbekistan and the Republic of Karakalpakstan is the "
        "duty of every citizen of the Republic of Karakalpakstan.\n"
        "Citizens are obliged to perform military or alternative service in the manner "
        "prescribed by law."))

    # SECTION THREE
    s.append(PageBreak())
    s.append(section("SECTION THREE\nSOCIETY AND THE INDIVIDUAL"))
    s.append(hr_blue())

    s.append(chapter("CHAPTER XII\nECONOMIC FOUNDATIONS OF SOCIETY"))
    s.append(art(51,
        "The basis of the economy of Karakalpakstan, aimed at developing market relations, is "
        "comprised of various forms of ownership.\n"
        "The state, taking into account the priority of consumer rights, guarantees freedom of "
        "economic activity, entrepreneurship, and labor, as well as the equality and legal "
        "protection of all forms of ownership. Private property, along with other forms of "
        "ownership, is inviolable and protected by the state. An owner may be deprived of "
        "property only in cases and in the manner prescribed by law."))
    s.append(art(52,
        "An owner, at their discretion, possesses, uses, and disposes of the property "
        "belonging to them. The use of property must not cause damage to the ecological "
        "environment or violate the rights and legally protected interests of citizens, legal "
        "entities, and the state."))
    s.append(art(53,
        "Land, its subsoil, waters, flora and fauna, and other natural resources are national "
        "wealth; they must be used rationally and are protected by the state."))

    s.append(chapter("CHAPTER XIII\nPUBLIC ASSOCIATIONS"))
    s.append(art(54,
        "Trade unions, political parties, scientific societies, women's organizations, veterans' "
        "and youth organizations, creative unions, mass movements, and other associations of "
        "citizens registered in the manner prescribed by law are recognized as public "
        "associations in the Republic of Karakalpakstan."))
    s.append(art(55,
        "The formation and activity of political parties and other public associations that aim "
        "to forcefully change the constitutional order, act against the sovereignty, integrity, "
        "and security of the Republic or the constitutional rights and freedoms of its citizens, "
        "advocate for war or social, national, racial, and religious hatred, or encroach upon "
        "the health and morality of the people, as well as militarized associations and political "
        "parties based on national or religious characteristics, are prohibited.\n"
        "The formation of secret societies and associations is prohibited."))
    s.append(art(56,
        "The state ensures the observance of the rights and legitimate interests of public "
        "associations and creates equal legal opportunities for their participation in public "
        "life.\n"
        "Interference by public associations in the activities of state bodies and officials, "
        "as well as interference by state bodies and officials in the activities of public "
        "associations, is not permitted."))
    s.append(art(57,
        "Trade unions express and protect the socio-economic rights and interests of employees. "
        "Membership in trade organizations is voluntary."))
    s.append(art(58,
        "Political parties express the political will of various social strata and groups and "
        "participate in the formation of state authority through their democratically elected "
        "representatives. Political parties are required to provide open reports on the sources "
        "of financing for their activities to the Jokargy Kenes or its authorized body in the "
        "established manner."))
    s.append(art(59,
        "Religious organizations and associations are separated from the state and are equal "
        "before the law. The state shall not interfere in the activities of religious "
        "associations."))
    s.append(art(60,
        "The dissolution, prohibition, or restriction of the activities of public associations "
        "shall be carried out only on the basis of a court decision."))

    s.append(chapter("CHAPTER XIV\nFAMILY"))
    s.append(art(61,
        "The family is the primary unit of society and has the right to protection by society "
        "and the state.\n"
        "Marriage is based on the free consent and equality of the parties."))
    s.append(art(62,
        "Parents are obliged to maintain and raise their children until they reach the age of "
        "majority.\n"
        "The state and society shall ensure the maintenance, upbringing, and education of "
        "orphaned children and children deprived of parental care, and shall encourage "
        "charitable activities concerning them."))
    s.append(art(63,
        "Children are equal before the law regardless of their parents' origin or civil status.\n"
        "Motherhood and childhood are protected by the state."))
    s.append(art(64, "Adult, able-bodied children are obliged to care for their parents."))

    s.append(chapter("CHAPTER XV\nMASS MEDIA"))
    s.append(art(65,
        "Mass media are free and operate in accordance with the law. They are responsible for "
        "the accuracy of information in the established manner. Censorship is not permitted."))

    # SECTION FOUR
    s.append(PageBreak())
    s.append(section("PART FOUR\nADMINISTRATIVE-TERRITORIAL STRUCTURE\nOF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(hr_blue())

    s.append(chapter("CHAPTER XVI\nADMINISTRATIVE-TERRITORIAL STRUCTURE\nOF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art(66,
        "The Republic of Karakalpakstan consists of districts, cities, towns, and villages."))
    s.append(art(67,
        "The establishment and abolition of districts and cities, as well as the alteration of "
        "their boundaries, shall be carried out by the Jokargy Kenes of the Republic of "
        "Karakalpakstan."))

    # SECTION FIVE
    s.append(PageBreak())
    s.append(section("PART FIVE\nORGANIZATION OF STATE POWER"))
    s.append(hr_blue())

    s.append(chapter("CHAPTER XVII\nTHE JOKARGY KENES OF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art(68,
        "The Jokargy Kenes of the Republic of Karakalpakstan, which exercises legislative "
        "power, is the supreme state representative body."))
    s.append(art(69,
        "The Jokargy Kenes of the Republic of Karakalpakstan consists of deputies elected from "
        "territorial electoral districts on a multi-party basis for a five-year term. Citizens "
        "of the Republic of Karakalpakstan who have reached the age of 25 by the day of the "
        "election have the right to be elected to the Jokargy Kenes of the Republic of "
        "Karakalpakstan. Requirements for candidates for deputies are determined by law."))
    s.append(art(70,
        "The exclusive powers of the Jokargy Kenes of the Republic of Karakalpakstan include:\n"
        "1) Adopting the Constitution of the Republic of Karakalpakstan, introducing amendments "
        "and additions to it;\n"
        "2) Adopting the laws of the Republic of Karakalpakstan, introducing amendments and "
        "additions to them, and providing interpretations of the laws of the Republic of "
        "Karakalpakstan;\n"
        "3) Adopting state strategic programs for economic and social development;\n"
        "4) Electing the Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan "
        "and their deputy;\n"
        "5) Forming the Presidium of the Jokargy Kenes of the Republic of Karakalpakstan;\n"
        "6) Appointing and dismissing the Chairperson of the Council of Ministers of the "
        "Republic of Karakalpakstan upon the recommendation of the Chairperson of the Jokargy "
        "Kenes of the Republic of Karakalpakstan and with the consent of the President of the "
        "Republic of Uzbekistan;\n"
        "7) Appointment and dismissal of the Deputy Chairmen and members of the Council of "
        "Ministers of the Republic of Karakalpakstan; the formation and abolition of ministries, "
        "state committees, and other state administration bodies of the Republic of "
        "Karakalpakstan;\n"
        "8) Election of the Constitutional Oversight Committee of the Republic of "
        "Karakalpakstan, the Supreme Court of the Republic of Karakalpakstan on Civil Cases, "
        "the Supreme Court of the Republic of Karakalpakstan on Criminal Cases, and the "
        "Economic Court of the Republic of Karakalpakstan;\n"
        "9) Appointment and dismissal of judges of inter-district, district, and city courts "
        "for civil and criminal cases;\n"
        "10) Appointment and dismissal of the Prosecutor of the Republic of Karakalpakstan "
        "upon the proposal of the Presidium of the Jokargy Kenes of the Republic of "
        "Karakalpakstan and with the consent of the Prosecutor General of the Republic of "
        "Uzbekistan;\n"
        "11) Appointment and dismissal of the Chairman of the State Committee for Nature "
        "Protection of the Republic of Karakalpakstan;\n"
        "12) Suspension and cancellation of decisions of local Kenges of people's deputies;\n"
        "13) Regulation of issues regarding the administrative-territorial structure through "
        "laws;\n"
        "14) Determination of the system and powers of republican and local state authority "
        "bodies;\n"
        "15) Approval of the state budget of the Republic of Karakalpakstan and reports on its "
        "execution upon the proposal of the Council of Ministers of the Republic of "
        "Karakalpakstan;\n"
        "16) Establishment of state awards and honorary titles of the Republic of "
        "Karakalpakstan;\n"
        "17) Scheduling elections to the Jokargy Kenes of the Republic of Karakalpakstan and "
        "local representative bodies; formation of the Central Election Commission;\n"
        "18) Submission of proposals to the Constitutional Court of the Republic of Uzbekistan "
        "regarding the compliance of acts issued by the higher state authority and "
        "administration bodies of the Republic of Uzbekistan with the Constitution of the "
        "Republic of Uzbekistan;\n"
        "19) Exercise of other powers provided for in this Constitution."))
    s.append(art(71,
        "The activities of the Jokargy Kenes of the Republic of Karakalpakstan are carried out "
        "in the manner prescribed by the Constitution of the Republic of Karakalpakstan and the "
        "Regulations of the Jokargy Kenes."))
    s.append(art(72,
        "A session of the Jokargy Kenes of the Republic of Karakalpakstan is considered "
        "competent if at least two-thirds of the total number of all deputies participate in "
        "its work."))
    s.append(art(73,
        "The Chairperson of the Council of Ministers of the Republic of Karakalpakstan and "
        "their deputies, ministers, heads of state committees, heads of other state "
        "administrative bodies, the Chairperson of the Constitutional Oversight Committee of "
        "the Republic of Karakalpakstan, the Chairperson of the Supreme Court for Civil Cases "
        "of the Republic of Karakalpakstan, the Chairperson of the Supreme Court for Criminal "
        "Cases of the Republic of Karakalpakstan, the Chairperson of the Economic Court of the "
        "Republic of Karakalpakstan, and the Prosecutor of the Republic of Karakalpakstan may "
        "participate in the sessions of the Jokargy Kenes of the Republic of Karakalpakstan "
        "and its bodies."))
    s.append(art(74,
        "After the expiration of its term of office, the Jokargy Kenes of the Republic of "
        "Karakalpakstan continues its work until the newly elected Jokargy Kenes begins its "
        "activities.\n"
        "The first session of the Jokargy Kenes after elections is convened by the Central "
        "Election Commission no later than two months after the elections."))
    s.append(art(75,
        "The right of legislative initiative in the Jokargy Kenes of the Republic of "
        "Karakalpakstan belongs to the deputies of the Jokargy Kenes, the Council of Ministers "
        "of the Republic of Karakalpakstan, the Constitutional Oversight Committee of the "
        "Republic of Karakalpakstan, the Supreme Court for Civil Cases of the Republic of "
        "Karakalpakstan, the Supreme Court for Criminal Cases of the Republic of Karakalpakstan, "
        "the Economic Court of the Republic of Karakalpakstan, and the Prosecutor of the "
        "Republic of Karakalpakstan."))
    s.append(art(76,
        "The Jokargy Kenes of the Republic of Karakalpakstan adopts laws, resolutions, and "
        "other acts.\n"
        "A majority vote of all deputies of the Jokargy Kenes of the Republic of Karakalpakstan "
        "is required to adopt a law.\n"
        "Publication of the laws of the Republic of Karakalpakstan and other normative acts of "
        "the Jokargy Kenes in the press is a mandatory condition for their application."))
    s.append(art(77,
        "The Jokargy Kenes of the Republic of Karakalpakstan elects committees and commissions "
        "from among its deputies to prepare draft laws, to preliminarily review and prepare "
        "issues to be submitted to the Jokargy Kenes, and to oversee the implementation of "
        "laws and other decisions of the Jokargy Kenes.\n"
        "When necessary, the Jokargy Kenes of the Republic of Karakalpakstan forms permanent "
        "or temporary deputy, investigative, and other commissions.\n"
        "The powers and procedures of the committees and commissions of the Jokargy Kenes of "
        "the Republic of Karakalpakstan are determined by law."))
    s.append(art(78,
        "Expenses related to the parliamentary activities of deputies of the Jokargy Kenes of "
        "the Republic of Karakalpakstan are reimbursed in the prescribed manner.\n"
        "Deputies of the Jokargy Kenes of the Republic of Karakalpakstan and its bodies working "
        "on a permanent basis may not occupy another paid position or engage in entrepreneurial "
        "activity during their term of office."))
    s.append(art(79,
        "A deputy of the Jokargy Kenes of the Republic of Karakalpakstan shall enjoy the right "
        "of immunity. They may not be brought to criminal responsibility, arrested, or subjected "
        "to administrative penalties imposed by a court without the consent of the Jokargy Kenes "
        "of the Republic of Karakalpakstan."))

    s.append(chapter("CHAPTER XVIII\nTHE CHAIRMAN OF THE JOKARGY KENES\nOF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art(80,
        "The Chairman of the Jokargy Kenes of the Republic of Karakalpakstan is the "
        "highest-ranking official of the Republic of Karakalpakstan.\n"
        "The Chairman of the Jokargy Kenes of the Republic of Karakalpakstan shall be elected "
        "by the Jokargy Kenes of the Republic of Karakalpakstan from among the deputies of the "
        "Jokargy Kenes of the Republic of Karakalpakstan by secret ballot for the term of "
        "office of the Jokargy Kenes of the Republic of Karakalpakstan, for no more than two "
        "consecutive terms."))
    s.append(art(81,
        "The Chairman of the Jokargy Kenes of the Republic of Karakalpakstan:\n"
        "1) ensures the coordinated interaction of the highest legislative and executive bodies "
        "of the Republic of Karakalpakstan;\n"
        "2) presents reports to the Jokargy Kenes of the Republic of Karakalpakstan on the "
        "situation in the Republic and other important issues;\n"
        "3) organizes the implementation of the laws of the Republic of Uzbekistan and other "
        "decisions of the Oliy Majlis, decrees and other acts of the President of the Republic "
        "of Uzbekistan; organizes the supervision over the execution of the laws of the Republic "
        "of Karakalpakstan and the resolutions of the Jokargy Kenes;\n"
        "4) presents to the Jokargy Kenes of the Republic of Karakalpakstan candidates for "
        "election to the positions of the Deputy Chairman of the Jokargy Kenes and the chairs "
        "of the committees and commissions of the Jokargy Kenes of the Republic of "
        "Karakalpakstan;\n"
        "5) presents to the Jokargy Kenes of the Republic of Karakalpakstan a candidate for "
        "the position of the Chairman of the Council of Ministers of the Republic of "
        "Karakalpakstan with the consent of the President of the Republic of Uzbekistan;\n"
        "6) appoints and dismisses district and city khokims (governors) upon the recommendation "
        "of the Chairman of the Council of Ministers of the Republic of Karakalpakstan, subject "
        "to subsequent confirmation by the relevant Councils of People's Deputies;\n"
        "7) presents to the Jokargy Kenes of the Republic of Karakalpakstan candidates for the "
        "positions of the chair and members of the Constitutional Oversight Committee of the "
        "Republic of Karakalpakstan with the consent of the Presidium of the Jokargy Kenes;\n"
        "8) submits to the Jokargy Kenes of the Republic of Karakalpakstan, with the consent "
        "of the President of the Republic of Uzbekistan, candidacies for the positions of the "
        "Chairperson and judges of the Supreme Court of the Republic of Karakalpakstan on Civil "
        "Affairs, the Chairperson and judges of the Supreme Court of the Republic of "
        "Karakalpakstan on Criminal Affairs, the Chairperson and judges of the Economic Court "
        "of the Republic of Karakalpakstan, as well as judges of inter-district, district, and "
        "city courts for civil and criminal affairs;\n"
        "9) submits to the Jokargy Kenes of the Republic of Karakalpakstan, with the consent "
        "of the Presidium of the Jokargy Kenes, the candidacy for the position of the "
        "Chairperson of the State Committee of the Republic of Karakalpakstan for Nature "
        "Protection;\n"
        "10) exercises general leadership over the preparation of issues to be submitted for "
        "consideration by the Jokargy Kenes; convenes sessions of the Jokargy Kenes and, "
        "together with the chairpersons of committees and commissions, forms proposals for its "
        "agenda;\n"
        "11) organizes the activities of the Jokargy Kenes of the Republic of Karakalpakstan "
        "and its Presidium, presides over their meetings, signs the laws of the Republic of "
        "Karakalpakstan and other acts adopted by the Jokargy Kenes of the Republic of "
        "Karakalpakstan and its Presidium, directs and coordinates the work of the committees "
        "and commissions of the Jokargy Kenes of the Republic of Karakalpakstan;\n"
        "12) presents nominations for state awards of the Republic of Karakalpakstan and "
        "honorary titles of the Republic of Karakalpakstan;\n"
        "13) initiates issues regarding the pardon of convicted citizens;\n"
        "14) organizes public discussions of draft laws and other important issues of state "
        "life;\n"
        "15) exercises other powers provided for by existing laws.\n"
        "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan has the right "
        "to submit issues within their competence for consideration by the Presidium of the "
        "Jokargy Kenes of the Republic of Karakalpakstan."))
    s.append(art(82,
        "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan issues orders "
        "on issues within their competence."))
    s.append(art(83,
        "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan may be recalled "
        "by the Jokargy Kenes of the Republic of Karakalpakstan in the event of a violation of "
        "the Constitution and laws of the Republic of Karakalpakstan.\n"
        "The decision on recall is adopted by a majority of at least two-thirds of the total "
        "number of deputies of the Jokargy Kenes of the Republic of Karakalpakstan, upon the "
        "initiative of at least one-third of the deputies, taking into account the conclusion "
        "of the Constitutional Oversight Committee of the Republic of Karakalpakstan.\n"
        "The Chairperson of the Jokargy Kenes of the Republic of Karakalpakstan may terminate "
        "their powers upon personal application, as well as in the event of an inability to "
        "fulfill their duties due to health conditions confirmed by the conclusion of a State "
        "Medical Commission formed by the Jokargy Kenes of the Republic of Karakalpakstan.\n"
        "The decision to terminate the powers of the Chairperson of the Jokargy Kenes of the "
        "Republic of Karakalpakstan is adopted by a majority vote of the total number of "
        "deputies of the Jokargy Kenes of the Republic of Karakalpakstan.\n"
        "In such cases, an election for a new Chairperson of the Jokargy Kenes of the Republic "
        "of Karakalpakstan shall be held within 10 days."))

    s.append(chapter("CHAPTER XIX\nTHE PRESIDIUM OF THE JOKARGY KENES\nOF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art(84,
        "To organize the activities of the Jokargy Kenes of the Republic of Karakalpakstan and "
        "exercise other powers, the Presidium of the Jokargy Kenes of the Republic of "
        "Karakalpakstan shall be formed. The Presidium of the Jokargy Kenes of the Republic of "
        "Karakalpakstan includes the Chairperson of the Jokargy Kenes, their deputy, the "
        "chairpersons of the committees and commissions of the Jokargy Kenes, and the leaders "
        "of party groups in the Jokargy Kenes of the Republic of Karakalpakstan."))
    s.append(art(85,
        "The Presidium of the Jokargy Kenes of the Republic of Karakalpakstan:\n"
        "1) prepares proposals on the agenda and procedure of work for the sessions of the "
        "Jokargy Kenes;\n"
        "2) hears reports on the ongoing work of the committees and commissions of the Jokargy "
        "Kenes and information regarding the implementation of the laws of the Republic of "
        "Karakalpakstan and decisions of the Jokargy Kenes;\n"
        "3) organizes the planning of work on draft laws;\n"
        "4) preliminarily reviews draft laws and other documents upon the proposal of the "
        "Chairperson of the Jokargy Kenes;\n"
        "5) discusses proposals and opinions expressed by deputies at the sessions of the "
        "Jokargy Kenes and adopts relevant decisions on them;\n"
        "6) confers state awards of the Republic of Karakalpakstan and grants honorary titles "
        "of the Republic of Karakalpakstan;\n"
        "7) during the period between sessions of the Jokargy Kenes, upon the recommendation "
        "of the Chairperson of the Council of Ministers of the Republic of Karakalpakstan, "
        "appoints and dismisses deputy chairpersons of the Council of Ministers and members of "
        "the Council of Ministers of the Republic of Karakalpakstan, establishes and abolishes "
        "ministries, state committees, and other state administration bodies of the Republic of "
        "Karakalpakstan, subsequently submitting resolutions on these matters for approval by "
        "the Jokargy Kenes of the Republic of Karakalpakstan;\n"
        "8) submits to the Jokargy Kenes of the Republic of Karakalpakstan a candidacy for the "
        "position of the Procurator of the Republic of Karakalpakstan, in agreement with the "
        "Procurator General of the Republic of Uzbekistan;\n"
        "9) during the period between sessions, gives consent to holding a deputy of the "
        "Jokargy Kenes accountable in cases and procedures established by law, as well as to "
        "the termination of an employment contract with them at the initiative of the employer;\n"
        "10) considers other issues related to the activities of the Jokargy Kenes and the "
        "effective exercise of powers by deputies.\n"
        "The Presidium of the Jokargy Kenes of the Republic of Karakalpakstan issues "
        "resolutions on matters within its competence, which shall be published in the "
        "established manner."))

    s.append(chapter("CHAPTER XX\nTHE COUNCIL OF MINISTERS OF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art(86,
        "The Council of Ministers of the Republic of Karakalpakstan — the Government of the "
        "Republic of Karakalpakstan — is the supreme executive and administrative body of state "
        "authority of the Republic of Karakalpakstan."))
    s.append(art(87,
        "The Council of Ministers of the Republic of Karakalpakstan is formed by the Jokargy "
        "Kenes of the Republic of Karakalpakstan. The Council of Ministers of the Republic of "
        "Karakalpakstan directs the effective functioning of the economy and the social and "
        "spiritual spheres; ensures the execution of the laws of the Republic of Uzbekistan and "
        "other decisions of the Oliy Majlis of the Republic of Uzbekistan, decrees, resolutions "
        "and orders of the President of the Republic of Uzbekistan, resolutions and orders of "
        "the Cabinet of Ministers of the Republic of Uzbekistan, laws of the Republic of "
        "Karakalpakstan and other decisions of the Jokargy Kenes of the Republic of "
        "Karakalpakstan, and resolutions of the Presidium of the Jokargy Kenes of the Republic "
        "of Karakalpakstan.\n"
        "The Council of Ministers of the Republic of Karakalpakstan suspends and repeals the "
        "acts of the state administration bodies of the Republic of Karakalpakstan, as well as "
        "the khokims of districts and cities."))
    s.append(art(88,
        "The Council of Ministers of the Republic of Karakalpakstan is headed by the Chairman, "
        "who is appointed by the Jokargy Kenes upon the recommendation of the Chairman of the "
        "Jokargy Kenes of the Republic of Karakalpakstan and in agreement with the President of "
        "the Republic of Uzbekistan.\n"
        "The Chairman of the Council of Ministers of the Republic of Karakalpakstan is, by "
        "virtue of his office, a member of the Cabinet of Ministers of the Republic of "
        "Uzbekistan.\n"
        "The Chairman of the Council of Ministers of the Republic of Karakalpakstan:\n"
        "1) directs the activities of the Government and takes measures for the effective "
        "exercise of its powers;\n"
        "2) submits to the Jokargy Kenes of the Republic of Karakalpakstan, and in the period "
        "between sessions to the Presidium of the Jokargy Kenes of the Republic of "
        "Karakalpakstan, candidacies for the appointment and dismissal of deputy chairmen of "
        "the Council of Ministers and members of the Council of Ministers of the Republic of "
        "Karakalpakstan;\n"
        "3) distributes duties among the deputy chairmen of the Council of Ministers and "
        "subsequently submits them for approval to the Presidium of the Council of Ministers;\n"
        "4) submits proposals to the Jokargy Kenes of the Republic of Karakalpakstan, and in "
        "the period between sessions to the Presidium of the Jokargy Kenes of the Republic of "
        "Karakalpakstan, on the creation and abolition of ministries, state committees, and "
        "other state administration bodies of the Republic of Karakalpakstan;\n"
        "5) submits to the Chairman of the Jokargy Kenes of the Republic of Karakalpakstan "
        "candidacies for the appointment and dismissal of khokims of districts and cities;\n"
        "6) presides over the meetings of the Council of Ministers and its Presidium;\n"
        "7) ensures collegiality in the activities of the Council of Ministers;\n"
        "8) adopts decisions on individual issues of state and economic management that do not "
        "require consideration at meetings of the Council of Ministers and its Presidium;\n"
        "9) exercises other powers established by law within the scope of its competence."))
    s.append(art(89,
        "The Council of Ministers of the Republic of Karakalpakstan is responsible and "
        "accountable to the Jokargy Kenes of the Republic of Karakalpakstan.\n"
        "The Council of Ministers of the Republic of Karakalpakstan shall report on its "
        "activities to the Jokargy Kenes of the Republic of Karakalpakstan at least once a "
        "year.\n"
        "The Council of Ministers of the Republic of Karakalpakstan shall resign its powers "
        "before the newly elected Jokargy Kenes of the Republic of Karakalpakstan."))
    s.append(art(90,
        "The Council of Ministers of the Republic of Karakalpakstan, on the basis of and in "
        "execution of the laws of the Republic of Uzbekistan and other decisions of the Oliy "
        "Majlis of the Republic of Uzbekistan, decrees, resolutions and ordinances of the "
        "President of the Republic of Uzbekistan, resolutions and ordinances of the Cabinet of "
        "Ministers of the Republic of Uzbekistan, laws of the Republic of Karakalpakstan and "
        "other decisions of the Jokargy Kenes of the Republic of Karakalpakstan, and resolutions "
        "of the Presidium of the Jokargy Kenes of the Republic of Karakalpakstan, shall issue "
        "resolutions and ordinances binding for execution throughout the territory of the "
        "Republic of Karakalpakstan."))
    s.append(art(91,
        "The powers of the Council of Ministers of the Republic of Karakalpakstan, its "
        "procedure of activity, and the relations of the Council of Ministers of the Republic "
        "of Karakalpakstan with other state bodies of the Republic of Karakalpakstan shall be "
        "determined by the law of the Republic of Karakalpakstan."))

    s.append(chapter("CHAPTER XXI\nFOUNDATIONS OF STATE POWER IN THE LOCALITIES"))
    s.append(art(92,
        "The Councils of People's Deputies, headed by khokims, are the representative bodies "
        "of authority in districts and cities (except for cities of district subordination) "
        "that resolve issues within their competence based on the interests of the state and "
        "citizens."))
    s.append(art(93,
        "The jurisdiction of local authorities includes the following issues:\n"
        "— ensuring legality, law and order, and the security of citizens;\n"
        "— issues of economic, social, and cultural development of the territories;\n"
        "— formation and execution of the local budget, establishment of local taxes and fees, "
        "and formation of extra-budgetary funds;\n"
        "— management of the local municipal economy;\n"
        "— protection of the environment and ensuring the registration of acts of civil status;\n"
        "— adoption of normative acts that do not contradict the Constitution and laws of the "
        "Republic of Karakalpakstan, and the exercise of other powers."))
    s.append(art(94,
        "Local government bodies shall implement the laws of the Republic of Uzbekistan, other "
        "decisions of the Oliy Majlis of the Republic of Uzbekistan, decrees, resolutions, and "
        "orders of the President of the Republic of Uzbekistan, resolutions and orders of the "
        "Cabinet of Ministers of the Republic of Uzbekistan, laws of the Republic of "
        "Karakalpakstan and other decisions of the Jokargy Kenes of the Republic of "
        "Karakalpakstan, resolutions of the Presidium of the Jokargy Kenes of the Republic of "
        "Karakalpakstan, and resolutions and orders of the Council of Ministers of the Republic "
        "of Karakalpakstan, and shall participate in the discussion of issues of republican and "
        "local significance.\n"
        "Decisions of higher bodies adopted within the scope of their powers are mandatory for "
        "execution by lower bodies.\n"
        "The term of office for Councils of People's Deputies and khokims is 5 years."))
    s.append(art(95,
        "In the respective territory, the khokim of a district or city shall lead the "
        "representative and executive authorities."))
    s.append(art(96,
        "The khokims of districts and cities shall be appointed and dismissed by the Chairman "
        "of the Jokargy Kenes of the Republic of Karakalpakstan upon the recommendation of the "
        "Chairman of the Council of Ministers of the Republic of Karakalpakstan and shall be "
        "confirmed by the relevant Councils of People's Deputies.\n"
        "The khokims of cities under district jurisdiction shall be appointed and dismissed by "
        "the district khokim and confirmed by the district Council of People's Deputies."))
    s.append(art(97,
        "The khokim of a district or city shall exercise their powers based on the principles "
        "of individual leadership and shall be personally responsible for the decisions and "
        "actions of the bodies they lead.\n"
        "The organization of the activities of khokims and local Councils of People's Deputies, "
        "the scope of their powers, and the procedure for electing local Councils of People's "
        "Deputies shall be regulated by law."))
    s.append(art(98,
        "The khokim, within the scope of the powers granted to them, shall adopt decisions "
        "that are mandatory for execution by all enterprises, institutions, organizations, "
        "associations, as well as officials and citizens in the relevant territory."))
    s.append(art(99,
        "In settlements, villages, as well as in city mahallas, the bodies of local "
        "self-government shall be citizens' assemblies, which elect a chairperson (aksakal) "
        "and their advisors for a term of 2.5 years.\n"
        "The procedure for electing local self-government bodies, the organization of their "
        "activities, and the scope of their powers shall be regulated by law."))

    s.append(chapter("CHAPTER XXII\nJUDICIAL POWER OF THE REPUBLIC OF KARAKALPAKSTAN"))
    s.append(art(100,
        "The judicial power of the Republic of Karakalpakstan functions independently from the "
        "legislative and executive powers, political parties, and other public associations."))
    s.append(art(101,
        "The judicial system of the Republic of Karakalpakstan consists of the Supreme Court "
        "of the Republic of Karakalpakstan on Civil Affairs, the Supreme Court of the Republic "
        "of Karakalpakstan on Criminal Affairs, and the Economic Court of the Republic of "
        "Karakalpakstan, elected for a term of five years, as well as inter-district, district, "
        "and city courts on civil and criminal affairs appointed for the same term. The "
        "organization and procedure of the courts' activities are determined by law. The "
        "establishment of extraordinary courts is not permitted."))
    s.append(art(102,
        "The Supreme Court of the Republic of Karakalpakstan on Civil Affairs is the highest "
        "judicial body in the field of civil litigation and has the right to exercise judicial "
        "supervision over the activities of inter-district courts on civil affairs."))
    s.append(art(103,
        "The Supreme Court of the Republic of Karakalpakstan on Criminal Affairs is the highest "
        "judicial body in the field of criminal and administrative litigation and has the right "
        "to exercise judicial supervision over the activities of district and city courts on "
        "criminal affairs."))
    s.append(art(104,
        "Economic disputes arising in the economic sphere and in the course of its management "
        "between enterprises, institutions, and organizations based on various forms of "
        "ownership, as well as entrepreneurs, shall be resolved by the Economic Court of the "
        "Republic of Karakalpakstan within the limits of its powers."))
    s.append(art(105,
        "Judges are independent and subject only to the law. Any interference in the activities "
        "of judges regarding the administration of justice is impermissible and shall entail "
        "liability in accordance with the law. The immunity of judges is guaranteed by law. "
        "Judges may not be senators or deputies of representative bodies of state power.\n"
        "Judges may not be members of political parties, participate in political movements, or "
        "engage in any other type of paid activity, except for scientific and pedagogical "
        "activities.\n"
        "A judge may be dismissed from office before the expiration of their term only on the "
        "grounds specified by law."))
    s.append(art(106,
        "In all courts, the consideration of cases is conducted openly. Hearing cases in closed "
        "sessions is permitted only in instances established by law."))
    s.append(art(107,
        "Acts of the judicial power are mandatory for all state bodies, public associations, "
        "enterprises, institutions, organizations, officials, and citizens."))
    s.append(art(108,
        "In the Republic of Karakalpakstan, court proceedings are conducted in the Karakalpak "
        "and Uzbek languages or in the language of the majority of the population in a given "
        "locality. Participants in the proceedings who do not speak the language in which the "
        "court proceedings are conducted are ensured the right to fully acquaint themselves with "
        "the case materials and participate in court proceedings through an interpreter, as well "
        "as the right to speak in court in their native language."))
    s.append(art(109,
        "The accused is ensured the right to defense. The right to receive professional legal "
        "assistance is guaranteed at any stage of the judicial process. To provide legal "
        "assistance to citizens, enterprises, organizations, and institutions, the advocacy "
        "operates. The formation and procedure of the advocacy's activities are determined by "
        "law."))

    s.append(chapter("CHAPTER XXIII\nELECTORAL SYSTEM"))
    s.append(art(110,
        "Citizens of the Republic of Karakalpakstan have the right to elect and be elected to "
        "representative bodies. Each voter has one vote. The right to vote, equality, and "
        "freedom of expression of will are guaranteed by law.\n"
        "Elections to the Jokargy Kenes of the Republic of Karakalpakstan and to district and "
        "city representative bodies of state power are held in the year their constitutional "
        "term of office expires — on the first Sunday of the third ten-day period of December. "
        "Elections are held on the basis of universal, equal, and direct suffrage by secret "
        "ballot. Citizens of the Republic of Karakalpakstan who have reached the age of eighteen "
        "have the right to vote.\n"
        "Citizens recognized by a court as legally incapable, as well as persons held in places "
        "of imprisonment by a court sentence, cannot be elected and do not participate in "
        "elections. In any other cases, direct or indirect restriction of the electoral rights "
        "of citizens is not permitted.\n"
        "A citizen of the Republic of Karakalpakstan cannot be a deputy in more than two "
        "representative bodies simultaneously.\n"
        "The procedure for holding elections is determined by law."))

    s.append(chapter("CHAPTER XXIV\nCONSTITUTIONAL CONTROL"))
    s.append(art(111,
        "Constitutional control in the Republic of Karakalpakstan is exercised by the "
        "Constitutional Control Committee of the Republic of Karakalpakstan. The Constitutional "
        "Control Committee is elected by the Jokargy Kenes of the Republic of Karakalpakstan "
        "from among specialists in the fields of politics and law, consisting of a Chairman of "
        "the Constitutional Control Committee, a Deputy Chairman, and members of the committee. "
        "The term of office for persons elected to the Constitutional Control Committee is five "
        "years.\n"
        "The duties of the Chairperson, Deputy Chairperson, and members of the Constitutional "
        "Supervision Committee may not be performed concurrently with a deputy mandate.\n"
        "Persons elected to the Constitutional Supervision Committee may not simultaneously be "
        "part of the bodies whose acts are under the supervision of the Committee.\n"
        "Persons elected to the Constitutional Supervision Committee shall be independent in "
        "the performance of their duties and shall be subordinate only to the Constitution of "
        "the Republic of Karakalpakstan."))
    s.append(art(112,
        "The Constitutional Supervision Committee of the Republic of Karakalpakstan:\n"
        "1) upon the instruction of the Jokargy Kenes of the Republic of Karakalpakstan, "
        "submits to it conclusions on the compliance of the laws of the Republic of "
        "Karakalpakstan and other acts submitted for consideration to the Jokargy Kenes of the "
        "Republic of Karakalpakstan with the Constitution of the Republic of Karakalpakstan;\n"
        "2) upon the proposal of at least one-fifth of the deputies of the Jokargy Kenes of "
        "the Republic of Karakalpakstan or the Chairperson of the Jokargy Kenes of the Republic "
        "of Karakalpakstan, submits to the Jokargy Kenes of the Republic of Karakalpakstan "
        "conclusions on the compliance of laws and other acts adopted by the Jokargy Kenes of "
        "the Republic of Karakalpakstan with the Constitution of the Republic of Karakalpakstan;\n"
        "3) upon the instruction of the Jokargy Kenes of the Republic of Karakalpakstan, "
        "submits to it conclusions on the compliance of the resolutions of the Presidium of the "
        "Jokargy Kenes of the Republic of Karakalpakstan and the orders of the Chairperson of "
        "the Jokargy Kenes with the Constitution and laws of the Republic of Karakalpakstan;\n"
        "4) upon the instruction of the Jokargy Kenes of the Republic of Karakalpakstan, or "
        "upon the proposals of at least one-fifth of the deputies of the Jokargy Kenes of the "
        "Republic of Karakalpakstan or the Chairperson of the Jokargy Kenes of the Republic of "
        "Karakalpakstan, submits to the Jokargy Kenes of the Republic of Karakalpakstan "
        "conclusions on the compliance of the resolutions and orders of the Council of Ministers "
        "of the Republic of Karakalpakstan with the Constitution and laws of the Republic of "
        "Karakalpakstan.\n"
        "Furthermore, the Constitutional Supervision Committee has the right to submit, on its "
        "own initiative, conclusions on the compliance of the acts of the higher bodies of state "
        "power and administration of the Republic of Karakalpakstan with the Constitution and "
        "laws of the Republic of Karakalpakstan.\n"
        "A conclusion of the Committee may be overturned only by a decision of the Jokargy "
        "Kenes of the Republic of Karakalpakstan adopted by a two-thirds majority vote of the "
        "total number of deputies of the Jokargy Kenes of the Republic of Karakalpakstan.\n"
        "The organization and procedure of activity of the Constitutional Supervision Committee "
        "of the Republic of Karakalpakstan shall be determined by the Law on the Constitutional "
        "Supervision Committee of the Republic of Karakalpakstan."))

    s.append(chapter("CHAPTER XXV\nTHE PROSECUTOR'S OFFICE"))
    s.append(art(113,
        "The Prosecutor of the Republic of Karakalpakstan and their subordinate prosecutors "
        "shall ensure the supervision of the strict and uniform execution of laws throughout "
        "the territory of the Republic of Karakalpakstan."))
    s.append(art(114,
        "The Prosecutor of the Republic of Karakalpakstan is appointed and dismissed by the "
        "Jokargy Kenes of the Republic of Karakalpakstan in agreement with the Prosecutor "
        "General of the Republic of Uzbekistan.\n"
        "Prosecutors of districts and cities are appointed and dismissed by the Prosecutor "
        "General of the Republic of Uzbekistan upon the recommendation of the Prosecutor of "
        "the Republic of Karakalpakstan.\n"
        "The term of office for the Prosecutor of the Republic of Karakalpakstan, as well as "
        "for district and city prosecutors, is five years."))
    s.append(art(115,
        "The prosecution authorities of the Republic of Karakalpakstan exercise their powers "
        "independently of any state bodies, public associations, and officials, being "
        "subordinate only to the law.\n"
        "Prosecutors shall suspend their membership in political parties and other public "
        "associations pursuing political goals for the duration of their term of office.\n"
        "The organization, powers, and operational procedures of the prosecution authorities "
        "are determined by law."))
    s.append(art(116,
        "The establishment and activity of private or cooperative organizations, public "
        "associations, and their branches that independently perform operational-search, "
        "investigative, or other special tasks to combat crime within the territory of the "
        "Republic of Karakalpakstan is prohibited.\n"
        "Public associations and citizens may assist law enforcement agencies in protecting "
        "the rule of law, legal order, and the rights and freedoms of citizens."))

    s.append(chapter("CHAPTER XXVI\nFINANCE AND BUDGET"))
    s.append(art(117,
        "The state budget of the Republic of Karakalpakstan includes the republican and local "
        "budgets."))
    s.append(art(118,
        "The allocation of revenues and expenditures of the state budget of the Republic of "
        "Karakalpakstan between the republican and local budgets is determined by the laws of "
        "the Republic of Karakalpakstan."))

    # SECTION SIX
    s.append(PageBreak())
    s.append(section("PART SIX\nPROCEDURE FOR AMENDING THE CONSTITUTION"))
    s.append(hr_blue())

    s.append(art(119,
        "Amendments to the Constitution of the Republic of Karakalpakstan are introduced by a "
        "law adopted by at least two-thirds of the total number of deputies of the Jokargy "
        "Kenes of the Republic of Karakalpakstan, or by a referendum of the Republic of "
        "Karakalpakstan."))
    s.append(art(120,
        "The Jokargy Kenes of the Republic of Karakalpakstan has the right to adopt a law on "
        "introducing amendments to the Constitution within six months after the corresponding "
        "proposal has been submitted.\n"
        "If the Jokargy Kenes of the Republic of Karakalpakstan rejects the proposal to amend "
        "the Constitution, it may be resubmitted no earlier than one year later."))

    # Final page
    s.append(PageBreak())
    s.append(Spacer(1, 3*cm))
    s.append(HRFlowable(width="60%", thickness=2, color=GOLD,
                         hAlign='CENTER', spaceAfter=20))
    s.append(Paragraph(
        "CONSTITUTION OF THE REPUBLIC OF KARAKALPAKSTAN",
        S['cover_republic']))
    s.append(Paragraph(
        "Adopted April 9, 1993 · Edition " + YEAR,
        S['cover_adopted']))
    s.append(Spacer(1, 0.5*cm))
    s.append(Paragraph(
        '<link href="https://www.karakalpakvoice.org" color="#1a4a7a">www.karakalpakvoice.org</link>',
        S['cover_link']))
    s.append(Paragraph(
        "Karakalpakstan — a sovereign republic · Archival document · " + YEAR,
        S['cover_site']))
    s.append(HRFlowable(width="60%", thickness=2, color=GOLD,
                         hAlign='CENTER', spaceBefore=20))
    return s

# — Build PDF —————————————————————————————————————————————————————————————
def build_pdf(output_path="constitution_2019_en.pdf"):
    doc = BaseDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
        title="Constitution of the Republic of Karakalpakstan " + YEAR,
        author="karakalpakvoice.org",
        subject="Constitution of the Republic of Karakalpakstan",
        creator="www.karakalpakvoice.org"
    )
    doc.addPageTemplates([make_page_template(doc)])

    story = []
    story += build_cover()
    story += build_content()

    doc.build(story)
    print("PDF created: " + output_path)

if __name__ == "__main__":
    build_pdf()