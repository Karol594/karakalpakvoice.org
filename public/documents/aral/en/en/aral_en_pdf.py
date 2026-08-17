# -*- coding: utf-8 -*-
"""
ARAL — An Appeal to the International Community (EN)
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
OUTPUT    = os.path.join(SCRIPT_DIR, "aral_en.pdf")
SITE_URL  = "https://www.karakalpakvoice.org"
SITE_TXT  = "www.karakalpakvoice.org"
DOC_DATE  = "June 3, 2026"

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

# -- Header / Footer (every page) --------------------------------------------
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
    canvas.drawRightString(PAGE_W - MARGIN, hy, "ARAL SEA ECOLOGICAL CATASTROPHE")

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
    canvas.drawString(MARGIN, fy, "The People of Karakalpakstan")
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
    s.append(P("THE HUMANITARIAN SITUATION OF THE POPULATION OF KARAKALPAKSTAN<br/>"
               "IN THE CONTEXT OF THE ARAL SEA ECOLOGICAL CATASTROPHE", 'cover_title'))
    s.append(P("An Appeal to the International Community", 'cover_sub'))
    s.append(gap(0.3 * cm))
    s.append(P("To the United Nations (UN) and its specialized agencies;<br/>"
               "To the Organization for Security and Co-operation in Europe (OSCE);<br/>"
               "To the Office of the UN High Commissioner for Human Rights (OHCHR);<br/>"
               "To diplomatic missions;<br/>"
               "To human rights organizations and independent journalists.", 'cover_addr'))
    s.append(gap(0.6 * cm))
    if os.path.exists(ARAL_HIST):
        hist = Image(ARAL_HIST, width=13.0 * cm, height=10.4 * cm)
        hist.hAlign = 'CENTER'
        s.append(hist)
        s.append(gap(0.15 * cm))
        s.append(P("The Aral Sea: 1977–2014 (satellite imagery)", 'cover_addr'))
    else:
        print("NOTE: aralhistori.jpg not found - historical image skipped.")
    s.append(gap(0.3 * cm))
    s.append(P(DOC_DATE, 'cover_date'))
    s.append(gap(0.3 * cm))
    s.append(rule(GOLD, 1.2))
    s.append(PageBreak())
    return s

# -- Body ---------------------------------------------------------------------
def build_body():
    s = []
    s.append(P("Executive Summary", 'section'))
    s.append(P("The desiccation of the Aral Sea stands as one of the most severe "
               "anthropogenic ecological catastrophes of the 20th century, frequently "
               "characterized by scientists as a “quiet Chernobyl.” The primary burden "
               "of this disaster is borne by the population of Karakalpakstan—"
               "approximately 2 million people—inhabiting the southern coast of the "
               "former sea."))
    s.append(P("The ramifications of this crisis transcend geographical borders. Salt "
               "and toxic dust uplifted from the exposed seabed disperse over thousands "
               "of kilometers, accelerating the melting of regional mountain glaciers. "
               "Furthermore, scientific evidence indicates that the displacement of such "
               "an immense volume of water has impacted sub-surface geophysical dynamics, "
               "inducing changes within the Earth's mantle. This phenomenon constitutes "
               "an issue of global, planetary significance."))
    s.append(P("The data and evidence presented in this appeal do not constitute "
               "abstract threats; rather, they represent quantified phenomena "
               "substantiated by international scientific sources. These include the "
               "widespread prevalence of anemia, an ongoing tuberculosis epidemic, "
               "elevated rates of infant and maternal mortality, the contamination of "
               "drinking water with toxic substances, and the destruction of the "
               "fundamental livelihoods of millions of people."))
    s.append(P("We call upon the international community to direct its attention to this "
               "ongoing humanitarian crisis. We urgently request the implementation of "
               "independent ecological and medical monitoring, the assurance of "
               "transparency and accountability in the allocation of international funds "
               "dedicated to the Aral Sea region, and the provision of targeted "
               "assistance to the affected population."))

    s.append(P("I. Scale of the Disaster", 'section'))
    s.append(P("The Aral Sea was once the world's fourth-largest inland body of water, "
               "covering an area of approximately 68,000 square kilometers. Beginning in "
               "the 1960s, following the diversion of the Amu Darya and Syr Darya rivers "
               "for cotton irrigation, the sea began to desiccate rapidly. By 2007, it "
               "had lost approximately 90 percent of its volume, leaving only about 10 "
               "percent of its original surface area."))
    s.append(P("The desiccation of the sea has given rise to one of the world's youngest "
               "deserts—the Aralkum Desert, which spans approximately 60,000 square "
               "kilometers. Since 1960, the sea has lost more than 1,000 cubic "
               "kilometers of water."))

    s.append(P("II. Toxic Dust: A Threat That Knows No Borders", 'section'))
    s.append(P("The exposed seabed of the Aral Sea has become a repository of salts, "
               "mineral deposits, pesticides, and herbicides that accumulated over "
               "decades through agricultural runoff from cotton fields. Today, the dried "
               "seabed serves as a source of dispersal for these hazardous substances "
               "across vast areas of the region."))
    s.append(P("According to scientific estimates, between 15 and 75 million tons of salt "
               "and toxic particulate matter are carried annually by wind from the "
               "exposed seabed. Some studies estimate that this figure exceeds 100 "
               "million tons per year. Air quality degradation has been documented at "
               "distances of up to 800 kilometers from the source."))
    s.append(P("This is not ordinary desert dust. Scientific research has detected "
               "elevated concentrations of DDT, arsenic, mercury, and other toxic "
               "organochlorine compounds in the blood, urine, and even breast milk of "
               "residents of the Aral Sea region."))
    s.append(P("The impact of this dust extends far beyond the borders of "
               "Karakalpakstan. Scientific studies and atmospheric modeling indicate "
               "that dust originating from the Aral Sea basin can travel hundreds and "
               "even thousands of kilometers, reaching Georgia and the Arctic, while "
               "some models suggest the potential for transport as far as Greenland. Of "
               "even greater concern, the deposition of toxic dust on glacier surfaces "
               "and the increased mineralization of precipitation accelerate the melting "
               "of mountain glaciers that feed the Amu Darya and Syr Darya river "
               "systems, thereby exacerbating future water scarcity throughout the "
               "region."))

    s.append(P("III. Impact on Public Health", 'section'))
    s.append(P("The humanitarian dimension of the disaster is most clearly reflected in "
               "its effects on public health."))
    s.append(P("<b>Anemia.</b> According to studies based on data from the World Health "
               "Organization (WHO), the prevalence of anemia among women and children in "
               "Karakalpakstan ranges between 80 and 90 percent, placing it among the "
               "highest rates recorded anywhere in the world. Some studies indicate that "
               "the prevalence among pregnant women reaches as high as 99 percent.",
               'body_noindent'))
    s.append(P("<b>Tuberculosis.</b> The World Health Organization identifies 50–70 "
               "cases per 100,000 people as an epidemic threshold. In Karakalpakstan, the "
               "incidence rate is approximately 220 cases per 100,000 population. The "
               "region is also recognized as having one of the highest rates of "
               "multidrug-resistant tuberculosis (MDR-TB) in the world.",
               'body_noindent'))
    s.append(P("<b>Infant and Maternal Mortality.</b> Scientific studies report infant "
               "mortality rates in Karakalpakstan ranging from 60 to 110 deaths per 1,000 "
               "live births, substantially exceeding both the average rate for Uzbekistan "
               "(approximately 48 per 1,000) and that of Russia (approximately 24 per "
               "1,000).", 'body_noindent'))
    s.append(P("<b>Respiratory Diseases, Cancer, and Congenital Disorders.</b> Exposure "
               "to toxic dust has been associated with a significant increase in chronic "
               "bronchitis, asthma, kidney and liver diseases, cancer, and congenital "
               "abnormalities. Acute respiratory illnesses account for nearly half of all "
               "child mortality cases in the region.", 'body_noindent'))

    s.append(P("IV. Socio-Economic Consequences", 'section'))
    s.append(P("The fishing economy that once sustained tens of thousands of people has "
               "completely collapsed; port cities such as Moynaq now lie hundreds of "
               "kilometers away from the former shoreline. According to expert "
               "assessments, the disaster has forced more than 100,000 people to leave "
               "their homes and has affected the health of over 5 million people across "
               "the wider region. Remaining water sources have been contaminated by "
               "agricultural chemicals, and the quality of drinking water has reached a "
               "critical level."))

    s.append(P("V. Planetary and Historical Significance of the Catastrophe", 'section'))
    s.append(P("<b>Impact on the Earth's mantle.</b> A study published in 2025 in Nature "
               "Geoscience (Peking University, University of Southern California) found "
               "that, as a result of the Aral Sea's disappearance, the exposed seabed is "
               "rising by approximately 7 millimeters per year within a radius of 500 "
               "kilometers. The cause is the “rebound” of the Earth's crust after being "
               "relieved of the weight of more than 1,000 cubic kilometers of water. The "
               "authors conclude that human activity can influence even the deep internal "
               "dynamics of the Earth. This phenomenon clearly demonstrates the planetary "
               "scale of the disaster.", 'body_noindent'))
    s.append(P("<b>Legacy of the biochemical testing site.</b> Between 1942 and 1992, the "
               "Soviet biochemical testing ground (“Barkhan,” PNIL-52) operated on "
               "Vozrozhdeniye (Barsakelmes) Island in the Aral Sea. As the sea receded, "
               "the site became part of the mainland, creating an additional threat to "
               "the region's environmental security.", 'body_noindent'))

    s.append(P("VI. Uzbekistan's Water Policy: Transboundary Damage and Potential "
               "Intentional Objectives", 'section'))
    s.append(P("<b>Deliberate Blockage of the Amu Darya River.</b> International "
               "scientific monitoring and local-level data indicate that Uzbekistan is "
               "deliberately blocking the waters of the Amu Darya, preventing them from "
               "reaching the Aral Sea. This action is evaluated as serving two potential "
               "objectives:", 'body_noindent'))
    s.append(P("1. Drying up the sea bed to facilitate the extraction of natural "
               "resources (gas, minerals, and other deposits) through simplified access. "
               "The resource potential beneath the Aralkum Desert is scientifically "
               "estimated to be substantial.", 'listitem'))
    s.append(P("2. Inducing a severe water shortage for the population of Karakalpakstan "
               "to compel displacement, thereby establishing direct ownership over the "
               "land and its resources. The 2022 attempt to revoke the sovereign status "
               "of Karakalpakstan is cited as evidence of this policy.", 'listitem'))
    s.append(P("<b>Transparency of Reservoirs.</b> Official documentation (UNFCCC) lists "
               "70 registered artificial reservoirs within Uzbekistan. However, local "
               "assessments place this figure at over 140–150. A significant number of "
               "these reservoirs are not visible on standard public mapping services "
               "(such as Google Maps), suggesting clandestine operation. Consequently, it "
               "is imperative that the United Nations establishes an independent, credible "
               "commission to conduct an on-site, rigorous verification process within "
               "Uzbekistan.", 'body_noindent'))

    s.append(P("VII. International Legal Framework", 'section'))
    s.append(P("This matter is recognized at the international level and transcends "
               "domestic jurisdiction based on the following frameworks:"))
    s.append(P("1. On May 18, 2021, the UN General Assembly unanimously adopted "
               "Resolution A/RES/75/278, declaring the Aral Sea region a zone of "
               "ecological innovations and technologies.", 'listitem'))
    s.append(P("2. In 1993, regional states established the International Fund for Saving "
               "the Aral Sea (IFAS), and the UN system subsequently operated the "
               "Multi-Partner Human Security Trust Fund for the Aral Sea Region.",
               'listitem'))
    s.append(P("3. On July 28, 2022, the UN General Assembly adopted Resolution "
               "A/RES/76/300, recognizing the right to a clean, healthy, and sustainable "
               "environment as a universal human right. The situation in the Aral Sea "
               "region directly intersects with this right.", 'listitem'))
    s.append(P("This issue cannot be dismissed as an internal matter of Uzbekistan. "
               "First, the transboundary dispersal of dust and toxic substances impacts "
               "multiple states, constituting transboundary environmental damage. "
               "Second, human rights—specifically the right to health and a healthy "
               "environment—are subject to international scrutiny and cannot be classified "
               "exclusively as domestic affairs. On these two grounds, the Aral crisis "
               "remains a legitimate subject of international oversight and concern."))

    s.append(P("VIII. Historical and Legal Reminder: Restoring the Sovereign Status of "
               "Karakalpakstan", 'section'))
    s.append(P("On 14 December 1990, the Supreme Council of the Karakalpak ASSR "
               "(Resolution No. 82/XII, Chair T. Yeshimbetova) adopted the Declaration on "
               "State Sovereignty. Its preamble states:"))
    s.append(P("“Committed to the development of peoples and to addressing the "
               "environmental problems arising from the drying of the Aral Sea, taking "
               "into account the extremely low living standards of citizens residing in "
               "the zone of ecological disaster…”", 'quote'))
    s.append(P("The Declaration is a historic document that defined the political and "
               "legal status of Karakalpakstan. Moreover, Karakalpakstan is recognized as "
               "a sovereign republic within the Constitution of Uzbekistan itself."))
    s.append(P("<b>Proposal to the international community:</b> To restore the sovereign "
               "status of Karakalpakstan, as established on 14 December 1990, in "
               "accordance with international law. This proposal aligns with current "
               "international practice, as demonstrated by the example of Latvia. It may "
               "serve as an effective and just pathway toward resolving one of the "
               "world's most severe crises. The voice of the region that has suffered the "
               "greatest harm must be heard directly.", 'body_noindent'))

    s.append(P("IX. Demands and Recommendations", 'section'))
    s.append(P("Based on the facts outlined above, we request the following from the "
               "international community:"))
    reqs = [
        ("Independent monitoring.", "Establish independent environmental and "
         "public-health monitoring in Karakalpakstan with the participation of "
         "international experts; if necessary, deploy a UN technical mission."),
        ("Accurate assessment of water resources.", "Under UN auspices, form a credible "
         "commission to conduct an exact inspection of the true number of reservoirs in "
         "Uzbekistan. It must be verified whether the actual number exceeds 140–150, "
         "rather than the officially stated 70."),
        ("Transparency and accountability of financial flows.", "Publish open, audited "
         "reports on how international funds and grants related to the Aral Sea are "
         "allocated and spent; ensure that assistance reaches the affected population."),
        ("Targeted humanitarian programmes.", "Support targeted initiatives providing "
         "clean drinking water, treatment for tuberculosis and anemia, and protection of "
         "maternal and child health."),
        ("Local voice and press freedom.", "Ensure the participation of local "
         "representatives and journalists in decision-making processes; guarantee safe "
         "and unhindered access for observers and the press."),
        ("Sustained attention.", "Maintain this crisis under continuous international "
         "oversight rather than temporary interest."),
        ("Restoration of Karakalpakstan's sovereign status.", "Restore the sovereign "
         "status of Karakalpakstan, based on the Declaration of 14 December 1990 and in "
         "accordance with international law (as in the Latvian example). This would "
         "provide a sound legal foundation for the rapid and effective resolution of the "
         "Aral crisis."),
    ]
    for i, (head, txt) in enumerate(reqs, 1):
        s.append(P("%d. <b>%s</b> %s" % (i, head, txt), 'listitem'))

    s.append(P("Conclusion", 'section'))
    s.append(P("The Aral catastrophe is not merely a story of a vanished sea. It is the "
               "story of millions of people forced to live each day amid disease, "
               "contaminated water and air, and the loss of their traditional way of "
               "life. Their rights to health, clean water, and a safe environment are "
               "universal human rights."))
    s.append(P("We present these facts based on evidence and reliable data, and we call "
               "on the international community for cooperation and support."))
    s.append(P("<b>The people of Karakalpakstan deserve attention, justice, and a "
               "future.</b>", 'body_noindent'))

    # -- Sources (with hyperlinks) --
    s.append(P("Sources", 'src_head'))
    SOURCES = [
        ("Aral Sea tragedy: causes, impacts and possible solutions — Kun.uz, 2024.",
         "https://kun.uz/en/news/2024/08/01/aral-sea-tragedy-causes-impacts-and-possible-solutions"),
        ("Greening the Desert — World Bank, 2024 (Aralkum ≈ 60,000 km²).",
         "https://www.worldbank.org/en/news/feature/2024/12/04/greening-the-desert-the-role-of-landscape-restoration-in-uzbekistan-s-battle-against-sand-and-dust-storms"),
        ("Dust emission and environmental changes in the Aral Sea — Aeolian Research / ScienceDirect, 2015.",
         "https://www.sciencedirect.com/science/article/abs/pii/S1875963715000282"),
        ("Aralkum: world's newest desert — Atlas Obscura (NASA: &gt;100 million tons of salt dust/year).",
         "https://www.atlasobscura.com/articles/aralkum-worlds-newest-desert"),
        ("What Is Happening to the Aral Sea — ScienceInsights, 2026 (DDT, arsenic, mercury in blood/urine/breast milk).",
         "https://scienceinsights.org/what-is-happening-to-the-aral-sea-collapse-restoration/"),
        ("Dust emission and transport in the Aral Sea region — Geoderma / ScienceDirect, 2022 (transport to Georgia, Arctic; modelled to Greenland).",
         "https://www.sciencedirect.com/science/article/pii/S0016706122004840"),
        ("Aral Sea — Columbia University / LDEO (toxic dust on glaciers accelerating melt).",
         "https://www.ldeo.columbia.edu/~martins/hydro/case_studies/aral_sea.html"),
        ("Uzbekistan: Focus on health impact of Aral Sea crisis — IRIN / ReliefWeb (WHO: 80–90% anemia).",
         "https://reliefweb.int/report/uzbekistan/uzbekistan-focus-health-impact-aral-sea-crisis"),
        ("The Aral Sea Crisis — Columbia University (anemia up to 99% among pregnant women).",
         "http://www.columbia.edu/~tmt2120/impacts%20to%20life%20in%20the%20region.htm"),
        ("The Aral Sea disappears while tuberculosis climbs — MSF (TB ≈ 220/100,000).",
         "https://www.msf.org/aral-sea-disappears-while-tuberculosis-climbs"),
        ("Central Asia: Aral Sea crisis continues to erode health — ReliefWeb / MSF (MDR-TB).",
         "https://reliefweb.int/report/kazakhstan/central-asia-aral-sea-crisis-continues-erode-health"),
        ("The Aral Sea disaster and self-rated health — Health &amp; Place / ScienceDirect, 2002 (infant mortality 60–110/1,000).",
         "https://www.sciencedirect.com/science/article/abs/pii/S1353829202000175"),
        ("The Aral Sea Crisis — Columbia University (&gt;100,000 displaced; &gt;5 million affected).",
         "http://www.columbia.edu/~tmt2120/impacts%20to%20life%20in%20the%20region.htm"),
        ("Fan, W., Wang, T., Barbot, S., Luo, H. — Nature Geoscience, 2025. DOI: 10.1038/s41561-025-01664-w.",
         "https://doi.org/10.1038/s41561-025-01664-w"),
        ("Vozrozhdeniye Island / “Barkhan” (PNIL-52) Soviet biochemical testing site — GlobalSecurity.org.",
         "https://www.globalsecurity.org/wmd/world/russia/vozrozhdenly.htm"),
        ("UN General Assembly Resolution A/RES/75/278, 18.05.2021 — UN Digital Library; UNDP MPTF Office.",
         "https://digitallibrary.un.org/record/3928288"),
        ("UN General Assembly Resolution A/RES/76/300, 28.07.2022 (right to a clean, healthy environment).",
         "https://digitallibrary.un.org/record/3983329"),
        ("“Declaration on State Sovereignty” — Supreme Council of the Karakalpak ASSR, Resolution No. 82/XII, 14.12.1990.",
         "https://karakalpakvoice.org/declaration"),
        ("Constitution of the Republic of Uzbekistan — sovereign republic status of Karakalpakstan (Art. 85).",
         "https://constitution.uz/en/clause/index#section20"),
        ("Uzbekistan SAP Water — UNFCCC, 2023 (70 official reservoirs).",
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
        title="Aral Sea Ecological Catastrophe — An Appeal",
        author="karakalpakvoice.org",
    )
    frame = Frame(MARGIN, 2.0 * cm,
                  PAGE_W - 2 * MARGIN,
                  PAGE_H - 2.0 * cm - 2.4 * cm, id='main')
    doc.addPageTemplates([PageTemplate(id='all', frames=[frame],
                                        onPage=draw_decorations)])
    story = build_cover() + build_body()
    doc.build(story)
    print("PDF ready:", OUTPUT)

if __name__ == "__main__":
    build()