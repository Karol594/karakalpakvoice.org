# -*- coding: utf-8 -*-
"""
ARAL — Halıqaralıq jámiyetke múráját (KAA, Qaraqalpaqsha)
PDF generator — "2026 dizayn" (karakalpakvoice.org)
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
OUTPUT    = os.path.join(SCRIPT_DIR, "aral_kaa.pdf")
SITE_URL  = "https://www.karakalpakvoice.org"
SITE_TXT  = "www.karakalpakvoice.org"
DOC_DATE  = "2026-jıl 3-iyun"

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
        'cover_title': ParagraphStyle('cover_title', fontName='DejaVuBold', fontSize=18,
                                      textColor=DARK_BLUE, alignment=TA_CENTER,
                                      leading=23, spaceBefore=16, spaceAfter=12),
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

# -- Header / Footer (hár bette) ---------------------------------------------
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
    canvas.drawRightString(PAGE_W - MARGIN, hy, "АРАЛ ЭКОЛОГИЯЛЫҚ АПАТШЫЛЫҒЫ")

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
    canvas.drawString(MARGIN, fy, "Қарақалпақстан халқы")
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
    s.append(P("АРАЛ ЭКОЛОГИЯЛЫҚ АПАТШЫЛЫҒЫ ҲӘМ<br/>"
               "ҚАРАҚАЛПАҚСТАН ХАЛҚЫНЫҢ ИНСАНЫЙ ҲАЛ-АҲУЎАЛЫ", 'cover_title'))
    s.append(P("Халықаралық жәмийетке мүрәжәт", 'cover_sub'))
    s.append(gap(0.3 * cm))
    s.append(P("Бирлескен Миллетлер Шөлкеми (БМШ) ҳәм оның қәнигелескен мекемелерине;<br/>"
               "Европада Қәўипсизлик ҳәм Бирге Ислесиў Шөлкемине (ОБСЕ);<br/>"
               "БМШ-ниң Адам ҳуқықлары бойынша Жоқарғы комиссары мекемесине (OHCHR);<br/>"
               "Дипломатиялық ўәкилханаларға;<br/>"
               "Адам ҳуқықларын қорғаўшы шөлкемлерге ҳәм ғәрезсиз журналистлерге.", 'cover_addr'))
    s.append(gap(0.6 * cm))
    if os.path.exists(ARAL_HIST):
        hist = Image(ARAL_HIST, width=13.0 * cm, height=10.4 * cm)
        hist.hAlign = 'CENTER'
        s.append(hist)
        s.append(gap(0.15 * cm))
        s.append(P("Арал теңизи: 1977–2014 (спутник сүўретлери)", 'cover_addr'))
    else:
        print("ESKERTPE: aralhistori.jpg tabilmadi - suwret qosilmadi.")
    s.append(gap(0.3 * cm))
    s.append(P(DOC_DATE, 'cover_date'))
    s.append(gap(0.3 * cm))
    s.append(rule(GOLD, 1.2))
    s.append(PageBreak())
    return s

# -- Body ---------------------------------------------------------------------
def build_body():
    s = []
    s.append(P("Қысқаша мазмун", 'section'))
    s.append(P("Арал теңизиниң қурыўы — XX-әсирде инсан искерлиги нәтийжесинде жүзеге "
               "келген ең аўыр экологиялық апатшылықлардың бири; илимпазлар оны «тыныш "
               "Чернобыль» деп те атайды. Оның салмағы, биринши гезекте, теңиздиң қубла "
               "жағасында жасайтуғын Қарақалпақстан халқының (шама менен 2 миллион адам) "
               "мойнына түсти."))
    s.append(P("Бул апатшылықтың ақыбетлери шегара танымайды. Қурыған теңиз түбинен "
               "көтерилген дуз ҳәм зәҳәрли шаң мыңлаған километрлерге тарқалып, аймақтың "
               "таў музлықларының ериўин тезлетеди. Соның менен бирге, соншама көлемдеги "
               "суўдың жоғалыўы Жердиң тереңлигине де тәсир етип, Мантияның жылжыўына "
               "себеп болғаны илимий жақтан тастыйықланды. Бул — ҳақыйқатында да "
               "планеталық машқала."))
    s.append(P("Бул мүрәжәтта келтирилген барлық мағлыўматлар — абстракт қәўип емес, ал "
               "өлшенген ҳәм халықаралық, илимий дереклер менен тастыйықланған ҳәдийселер: "
               "қаны-азлықтың (анемия) кең тарқалыўы, туберкулёз эпидемиясы, нәресте ҳәм "
               "ана өлиминиң жоқарылығы, ишимлик суўдың зәҳәрли затлар менен патасланыўы "
               "ҳәм миллионлаған адамның турмыс тийкарының жоғалыўы."))
    s.append(P("Биз халықаралық жәмийетти бул инсаныйлық кризисине итибар қаратыўға, "
               "ғәрезсиз экологиялық ҳәм медициналық бақлаў жүргизиўге, Аралға байланыслы "
               "халықаралық қәрежетлердиң ашық ҳәм есаплы жумсалыўын тәмийинлеўге, "
               "сондай-ақ зыян көрген халыққа махсетли жәрдем көрсетиўге шақырамыз."))

    s.append(P("I. Апатшылықтың көлеми", 'section'))
    s.append(P("Бир ўақытлары Арал теңизи дүньядағы көлеми бойынша төртинши орында болған "
               "үлкен көл болып, шама менен 68 000 шаршы километр майданды ийелеген. "
               "1960-жыллардан баслап Әмиўдәрья менен Сырдәрьяның суўы пахта майданларын "
               "суўғарыўға бурылғаннан кейин теңиз тез қурый баслады. 2007-жылға келип ол "
               "өзиниң көлеминиң шама менен 90 пайызын жоғалтты, ал бетиниң тек шама менен "
               "10 пайызы ғана қалды."))
    s.append(P("Теңиздиң орнында дүньядағы ең жас шөллердиң бири — шама менен 60 000 "
               "шаршы километрлик Аралқум шөли пайда болды. 1960-жылдан берли теңиз 1000 "
               "куб километрден аслам суўын жоғалтты."))

    s.append(P("II. Зәҳәрли шаң: шегара танымайтуғын қәўип", 'section'))
    s.append(P("Қурыған теңиз ултаны — он жыллар даўамында пахта майданларынан жуўылып "
               "келген дуз, минерал төгинлер, пестицидлер ҳәм гербицидлердиң қойымшасына "
               "айланды. Бүгин ашылған түп бул химиялық затларды әтираптағы аймақларға "
               "тарқатыўшы дәрекке айланды."))
    s.append(P("Илимий баҳалаўлар бойынша, қурыған ултаннан ҳәр жылы 15 миллионнан 75 "
               "миллион тоннаға дейин дуз ҳәм зәҳәрли затлар самал менен тасылады; айырым "
               "баҳалаўларда бул муғдар жылына 100 миллион тоннадан асады, ал ҳаўаның "
               "сапасы дереклерде 800 километрге дейинги арақашықлықта бузылады."))
    s.append(P("Бул шаң әпиўайы шөл шаңы емес. Изертлеўлер теңиз жағасында жасаўшылардың "
               "қанында, сидикте ҳәтте ана сүтинде ДДТ, мышьяк (арсеник), сынап (ртуть) "
               "ҳәм басқа да зәҳәрли органохлор затлардың жоқары муғдарын анықлаған."))
    s.append(P("Бул шаңның тәсири Қарақалпақстан шегарасынан асып кетеди. Илимий "
               "изертлеўлер ҳәм моделлеўлер Арал шаңының жүзлеген–мыңлаған километрлерге, "
               "Грузияға ҳәттеки Арктика жағаларына дейин жететуғынын, ал айырым "
               "модельлерде Гренландияға жетиў итималын көрсетеди. Оннан да аўыры — "
               "музлықлар бетине түскен зәҳәрли шаң ҳәм жаўын-шашынның минерализациясы "
               "Әмиўдәрья менен Сырдәрьяны азықландыратуғын таў музлықларының ериўин "
               "тезлетеди, бул болса келешекте суў жетиспеўшилигин күшейтеди."))

    s.append(P("III. Халықтың саламатлығына тәсири", 'section'))
    s.append(P("Апатшылықтың инсаныйлық бөлими ең анық усы жерде көринеди:"))
    s.append(P("<b>Кемқанлық (анемия).</b> Дүньялық саламатлық шөлкеми (ДСШ / WHO) "
               "мағлыўматларына тийкарланған тексериўлер бойынша, Қарақалпақстанда "
               "ҳаяллар ҳәм балалар арасында анемия дәрежеси 80–90 пайызды қурайды — "
               "дүньядағы ең жоқары көрсеткишлердиң бири. Айырым изертлеўлерде бул "
               "көрсеткиш жүкли ҳаяллар арасында 99 пайызға жетеди.", 'body_noindent'))
    s.append(P("<b>Туберкулез.</b> ДСШ эпидемия шегин 100 000 адамға 50–70 жағдай деп "
               "белгилеген; Қарақалпақстанда болса бул көрсеткиш шама менен 220 жағдайды "
               "қурайды. Аймақ дәри-дәрмаққа шыдамлы туберкулез (MDR-TB) бойынша дүньядағы "
               "ең жоқары көрсеткишлердиң бирине ийе.", 'body_noindent'))
    s.append(P("<b>Нәресте ҳәм ана өлими.</b> Илимий дереклерде Қарақалпақстанда балалар "
               "өлими ҳәр 1000 туўылған балаға 60-110 жағдайды қурайды — бул Өзбекстан "
               "(≈48) ҳәм Россия (≈24) бойынша орташа көрсеткиштен бир қанша жоқары.",
               'body_noindent'))
    s.append(P("<b>Дем алыў жоллары кеселликлери, рак ҳәм туўма кемисликлер.</b> Зәҳәрли "
               "шаң себепли бронхит, астма, бүйрек ҳәм баўыр кеселликлери, рак ҳәм туўма "
               "кеселликлери сезилерли дәрежеде артқан; тез дем алыў кеселликлери балалар "
               "өлиминиң дерлик жартысын қурайды.", 'body_noindent'))

    s.append(P("IV. Социал-экономикалық ақыбетлер", 'section'))
    s.append(P("Бир ўақытлары он мыңлаған адамды тәмийинлеп турған балықшылық "
               "экономикасы толық қулады; Мойнақ сыяқлы порт қалалары теңизден жүзлеген "
               "километр узақта қалды. Қәнигелердиң баҳалаўы бойынша, апатшылық 100 000 "
               "нан аслам адамды өз журтынан көшиўге мәжбүр етти ҳәм пүткил аймақ бойынша "
               "5 миллионнан аслам адамның саламатлығына тәсир етти. Қалған суў дереклери "
               "аўыл хожалығы зәҳәрлери менен патасланып, ишимлик суўдың сапасы кризис "
               "дәрежесине жетти."))

    s.append(P("V. Апатшылықтың планеталық ҳәм тарийхый әҳимийети", 'section'))
    s.append(P("<b>Жер мантиясына тәсир.</b> 2025-жылы «Nature Geoscience» журналында "
               "жәрияланған изертлеў (Пекин университети, Қубла Калифорния университети) "
               "Аралдың қурыўы себепли қурыған ултанның жылына шама менен 7 миллиметрге, "
               "теңиз орайынан 500 километр радиуста көтерилип атырғанын анықлады. Себеби "
               "— 1000 куб километр суўдың салмағынан босаған жер қабығының жоқарыға қарай "
               "«қайтыўы». Авторлардың жуўмағы: инсан искерлиги Жердиң ишки, терең "
               "динамикасына да тәсир ете алады. Бул ҳәдийсе апатшылықтың планеталық "
               "масштабын анық көрсетеди.", 'body_noindent'))
    s.append(P("<b>Биохимиялық полигон мийрасы.</b> 1942–1992-жыллар аралығында Арал "
               "теңизиндеги «Возрождение» (Барсакелмес) атаўында совет биохимиялық сынақ "
               "полигоны («Барқан», ПНИЛ-52) иследи. Теңиз қурыған сайын бул атаў "
               "қурғақлыққа қосылды, бул болса аймақтың экологиялық қәўипсизлиги ушын "
               "қосымша машқала туўдырады.", 'body_noindent'))

    s.append(P("VI. Өзбекстанның суў сиясаты: трансшегаралық зыян ҳәм итимал махсетли "
               "сиясат", 'section'))
    s.append(P("<b>Әмиўдәрьяның адейи бөгелиўи.</b> Халықаралық илимий бақлаўлар ҳәм "
               "жергиликли дәрежедеги мағлыўматлар Өзбекстан тәрепинен Әмиўдәрьяның суўы "
               "адейи бөгелип, Аралға суў жиберилмей атырғанын көрсетпекте. Бунда еки "
               "итимал махсет бар деп баҳаланбақта:", 'body_noindent'))
    s.append(P("1. Теңизди қурытып, оның ултанынан аңсат жол менен қазылма-байлықларды "
               "(газ, мунай, уран, минераллар) қазып алыў. Аралқум шөли астында зор "
               "ресурслар болыўы мүмкинлиги илимий тәрептен баҳаланбақта.", 'listitem'))
    s.append(P("2. Қарақалпақстан халқына қолдан суў жетиспеўшилигин жаратып, оларды "
               "көшириў, сол арқалы жерин ҳәм байлығын Өзбекстанның меншиги етип алыў. Бул "
               "сиясаттың дәлийли ретинде 2022-жылғы Қарақалпақстанның Суверен статусын "
               "өшириўге урынысы келтирилмекте.", 'listitem'))
    s.append(P("<b>Суў сақлағышлардың ашықлығы мәселеси.</b> Өзбекстанда ресмий дизимнен "
               "өткен 70 жасалма суў сақлағыш бар деп белгиленген (UNFCCC ҳүжжети). Бирақ "
               "жергиликли есап бойынша бул муғдар 140–150-ден аслам. Бул суў "
               "сақлағышлардың көпшилиги Гугл картада көринбейди, яғный жасырын түрде "
               "ислеп атыр. Бундай жағдайда БМШ тәрепинен исенимли комиссия дузилип, "
               "Өзбекстанға барып нақпа-нақ тексериў өткерилиўи зәрүр.", 'body_noindent'))

    s.append(P("VII. Халықаралық-ҳуқықый тийкар", 'section'))
    s.append(P("Бул мәселе ҳәзирдиң өзинде халықаралық дәрежеде мойынланған, ҳәм ол тек "
               "ишки мәселе емес:"))
    s.append(P("1. 2021-жыл 18-майда БМШ Бас Ассамблеясы «A/RES/75/278» қарарын бирдей "
               "даўыс пенен қабыл етип, Аралбойы аймағын экологиялық инновациялар ҳәм "
               "технологиялар зонасы деп жәриялады.", 'listitem'))
    s.append(P("2. 1993-жылы регион мәмлекетлери Аралды Қутқарыў Халықаралық Қорын (IFAS) "
               "дүзди; БМШ системасында Аралбойы ушын Көп Тәреплеме Исеним Қоры "
               "(Multi-Partner Trust Fund) иследи.", 'listitem'))
    s.append(P("3. 2022-жыл 28-июльде БМШ Бас Ассамблеясы «A/RES/76/300» қарары менен "
               "таза, саламат ҳәм турақлы қоршаған орталыққа ийе болыў ҳуқықын "
               "улыўмаинсаныйлық ҳуқық сыпатында мойынлады. Аралбойындағы жағдай тиккелей "
               "усы ҳуқыққа қатнаслы.", 'listitem'))
    s.append(P("Бул — Өзбекстанның ишки мәселеси емес. Биринши, шаң ҳәм зәҳәрли затлардың "
               "тарқалыўы шегара асып, бир неше мәмлекетке тәсир етеди (трансшегаралық "
               "экологиялық зыян). Екинши, адам ҳуқықлары — соның ишинде саламатлық ҳәм "
               "саламат орталыққа болған ҳуқық — халықаралық бақлаўдан тыс «ишки ис» бола "
               "алмайды. Усы еки тийкар бойынша Арал машқаласы — нызамлы түрде халықаралық "
               "дыққат орайында болыўы тийис мәселе."))

    s.append(P("VIII. Тарийхый-ҳуқықый еске салыў: Қарақалпақстанның Суверен статусын "
               "тиклеў", 'section'))
    s.append(P("1990-жыл 14-декабрьде Қарақалпақ АССР Жоқарғы Кеңеси (Қарар № 82/XII, "
               "Председатель Т. Ешимбетова) «Мәмлекетлик Суверенитет ҳаққындағы "
               "Декларацияны» қабыл етти. Оның Кириспесинде:"))
    s.append(P("«Халықларды раўажландырыўға ҳәм Аралдың қурып баратырғанлығынан келип "
               "шыққан экологиялық машқалаларды шешиўге ғамқорлық ете отырып, экологиялық "
               "апатшылықтың нағыз орайында жасаўшы пухаралардың оғада төмен турмыс "
               "дәрежесин есапқа ала отырып...»", 'quote'))
    s.append(P("Декларация Қарақалпақстанның өз алдына сиясий-ҳуқықый статусын белгилеп "
               "берген тарийхый ҳүжжет болып есапланады. Сондай-ақ, Қарақалпақстан "
               "Өзбекстан Конституциясының өзинде «Суверен республика» сыпатында "
               "белгиленген."))
    s.append(P("<b>Дүньяға усыныс:</b> Халықаралық нызамларға сай 1990-жыл 14-декабрьде "
               "қабыл етилген Қарақалпақстанның Суверен статусын тиклеў. Бул усыныс "
               "Латвия мәмлекети мысалында ҳәзирги халықаралық практикаға сай келеди. Бул "
               "дүньядағы ең үлкен машқаланың тез ҳәм сапалы шешилиўине дурыс жол бола "
               "алады. Ең аўыр зыян көрген аймақтың даўысы бул мәселеде тиккелей "
               "еситилиўи тийис.", 'body_noindent'))

    s.append(P("IX. Талаплар ҳәм усыныслар", 'section'))
    s.append(P("Жоқарыдағы фактлерге тийкарланып, биз халықаралық жәмийеттен "
               "төмендегилерди сораймыз:"))
    reqs = [
        ("Ғәрезсиз бақлаў.", "Қарақалпақстанда қоршаған орталық ҳәм халық саламатлығы "
         "бойынша ғәрезсиз, халықаралық экспертлер қатнасындағы мониторинг "
         "шөлкемлестириў; зәрүр болса БМШ-ниң техникалық миссиясын жибериў."),
        ("Суў ресурсларының нақпа-нақ тексериўи.", "Өзбекстандағы суў сақлағышлардың шын "
         "муғдарын анықлаў ушын БМШ тәрепинен исенимли комиссия дузилип, нақпа-нақ "
         "тексериў өткерилиўи. Ресмий 70 емес, 140–150-ден аслам суў сақлағыш бар "
         "екенлиги тексерилиўи керек."),
        ("Қаржылардың ашық-айдынлығы ҳәм есаплылығы.", "Аралға байланыслы халықаралық "
         "қаржылар менен грантлардың қалай ҳәм қайда жумсалғаны бойынша ашық, аудиттен "
         "өткерилген есапларды жәриялаў; қаржылардың зыян көрген халыққа жетиўин "
         "қадағалаў."),
        ("Махсетли инсаныйлық бағдарламалар.", "Таза ишимлик суў, туберкулез ҳәм "
         "анемияны емлеў, ана менен бала саламатлығын қорғаў бойынша махсетли "
         "жойбарларды қоллап-қуўатлаў."),
        ("Жергиликли даўыс ҳәм баспасөз еркинлиги.", "Жергиликли халық ўәкиллерин ҳәм "
         "журналистлерди шешим қабыллаў процесслерине қосыў; бақлаўшылар менен баспасөзге "
         "қәўипсиз ҳәм тосқынлықсыз кириў имканиятын тәмийинлеў."),
        ("Турақлы итибар.", "Бул кризисти ўақтынша қызығыўшылық емес, ал турақлы "
         "халықаралық бақлаўда қадағалаў."),
        ("Қарақалпақстанның Суверен статусын тиклеў.", "1990-жыл 14-декабрьдеги "
         "Декларацияға тийкарланып, халықаралық нызамларға сай Қарақалпақстанның Суверен "
         "статусын тиклеў (Латвия мысалында). Бул Арал машқаласын тез ҳәм сапалы шешиўде "
         "дурыс ҳуқықый тийкар болып хызмет етеди."),
    ]
    for i, (head, txt) in enumerate(reqs, 1):
        s.append(P("%d. <b>%s</b> %s" % (i, head, txt), 'listitem'))

    s.append(P("Жуўмақ", 'section'))
    s.append(P("Арал апатшылығы — тек кеўип кеткен теңиз ҳаққындағы гәп емес. Бул — ҳәр "
               "күни кеселлик пенен, патасланған суў ҳәм ҳаўа менен, жоғалған турмыс "
               "тәризи менен жасаўға мәжбүр болған миллионлаған адам ҳаққындағы гәп. Бул "
               "халықтың саламатлыққа, таза суўға ҳәм саламат қоршаған орталыққа болған "
               "ҳуқықы — Улыўмаинсаныйлық ҳуқықлар."))
    s.append(P("Биз бул фактлерди дәлийллер ҳәм исенимли дереклер менен усынамыз ҳәм "
               "халықаралық жәмийетти бирге ислесиў ҳәм жәрдемге шақырамыз."))
    s.append(P("<b>Қарақалпақстан халқы итибарға, ҳақыйқатлыққа ҳәм келешекке ылайық.</b>",
               'body_noindent'))

    # -- Дереклер (силтемелери менен) --
    s.append(P("Дереклер", 'src_head'))
    SOURCES = [
        ("Aral Sea tragedy: causes, impacts and possible solutions — Kun.uz, 2024.",
         "https://kun.uz/en/news/2024/08/01/aral-sea-tragedy-causes-impacts-and-possible-solutions"),
        ("Greening the Desert — World Bank, 2024 (Aralkum ≈ 60 000 km²).",
         "https://www.worldbank.org/en/news/feature/2024/12/04/greening-the-desert-the-role-of-landscape-restoration-in-uzbekistan-s-battle-against-sand-and-dust-storms"),
        ("Dust emission and environmental changes in the Aral Sea — Aeolian Research / ScienceDirect, 2015.",
         "https://www.sciencedirect.com/science/article/abs/pii/S1875963715000282"),
        ("Aralkum: world's newest desert — Atlas Obscura (NASA: &gt;100 million tons salt dust/year).",
         "https://www.atlasobscura.com/articles/aralkum-worlds-newest-desert"),
        ("What Is Happening to the Aral Sea — ScienceInsights, 2026 (DDT, arsenic, mercury in blood/urine/breast milk).",
         "https://scienceinsights.org/what-is-happening-to-the-aral-sea-collapse-restoration/"),
        ("Dust emission and transport in the Aral Sea region — Geoderma / ScienceDirect, 2022 (transport to Georgia, Arctic; modelled to Greenland).",
         "https://www.sciencedirect.com/science/article/pii/S0016706122004840"),
        ("Aral Sea — Columbia University / LDEO (toxic dust on glaciers accelerating melt).",
         "https://www.ldeo.columbia.edu/~martins/hydro/case_studies/aral_sea.html"),
        ("Uzbekistan: Focus on health impact of Aral Sea crisis — IRIN / ReliefWeb (WHO: 80–90% anemia).",
         "https://reliefweb.int/report/uzbekistan/uzbekistan-focus-health-impact-aral-sea-crisis"),
        ("The Aral Sea Crisis — Columbia University (anemia up to 99% of pregnant women).",
         "http://www.columbia.edu/~tmt2120/impacts%20to%20life%20in%20the%20region.htm"),
        ("The Aral Sea disappears while tuberculosis climbs — MSF (TB ≈ 220/100 000).",
         "https://www.msf.org/aral-sea-disappears-while-tuberculosis-climbs"),
        ("Central Asia: Aral Sea crisis continues to erode health — ReliefWeb / MSF (MDR-TB).",
         "https://reliefweb.int/report/kazakhstan/central-asia-aral-sea-crisis-continues-erode-health"),
        ("The Aral Sea disaster and self-rated health — Health &amp; Place / ScienceDirect, 2002 (infant mortality 60–110/1000).",
         "https://www.sciencedirect.com/science/article/abs/pii/S1353829202000175"),
        ("The Aral Sea Crisis — Columbia University (&gt;100 000 displaced; &gt;5 million affected).",
         "http://www.columbia.edu/~tmt2120/impacts%20to%20life%20in%20the%20region.htm"),
        ("Fan, W., Wang, T., Barbot, S., Luo, H. — Nature Geoscience, 2025. DOI: 10.1038/s41561-025-01664-w.",
         "https://doi.org/10.1038/s41561-025-01664-w"),
        ("Возрождение атаўы / «Барқан» (ПНИЛ-52) совет биохимиялық полигоны — GlobalSecurity.org.",
         "https://www.globalsecurity.org/wmd/world/russia/vozrozhdenly.htm"),
        ("UN General Assembly Resolution A/RES/75/278, 18.05.2021 — UN Digital Library; UNDP MPTF Office.",
         "https://digitallibrary.un.org/record/3928288"),
        ("UN General Assembly Resolution A/RES/76/300, 28.07.2022 (right to clean, healthy environment).",
         "https://digitallibrary.un.org/record/3983329"),
        ("«Мәмлекетлик Суверенитет ҳаққындағы Декларация» — Қарақалпақ АССР Жоқарғы Кеңеси, Қарар № 82/XII, 14.12.1990.",
         "https://karakalpakvoice.org/declaration"),
        ("Өзбекстан Республикасы Конституциясы — Қарақалпақстанның суверен республика статусы (85-статья).",
         "https://constitution.uz/ru/clause/index#section20"),
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
        title="Арал экологиялық апатшылығы — Мүрәжәт",
        author="karakalpakvoice.org",
    )
    frame = Frame(MARGIN, 2.0 * cm,
                  PAGE_W - 2 * MARGIN,
                  PAGE_H - 2.0 * cm - 2.4 * cm, id='main')
    doc.addPageTemplates([PageTemplate(id='all', frames=[frame],
                                        onPage=draw_decorations)])
    story = build_cover() + build_body()
    doc.build(story)
    print("PDF tayyar:", OUTPUT)

if __name__ == "__main__":
    build()