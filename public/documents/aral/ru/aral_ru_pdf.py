# -*- coding: utf-8 -*-
"""
АРАЛ — Обращение к международному сообществу (RU)
PDF generator — "2026 дизайны" (karakalpakvoice.org)
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
OUTPUT    = os.path.join(SCRIPT_DIR, "aral_ru.pdf")
SITE_URL  = "https://www.karakalpakvoice.org"
SITE_TXT  = "www.karakalpakvoice.org"
DOC_DATE  = "3 июня 2026 г."   # <-- "03.06.2026" деп жазыў да болады

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
        'cover_title': ParagraphStyle('cover_title', fontName='DejaVuBold', fontSize=20,
                                      textColor=DARK_BLUE, alignment=TA_CENTER,
                                      leading=26, spaceBefore=18, spaceAfter=14),
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

# -- Header / Footer (har bette) ---------------------------------------------
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
    canvas.drawRightString(PAGE_W - MARGIN, hy, "АРАЛЬСКАЯ ЭКОЛОГИЧЕСКАЯ КАТАСТРОФА")

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
    canvas.drawString(MARGIN, fy, "Народ Каракалпакстана")
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
    s.append(P("АРАЛЬСКАЯ ЭКОЛОГИЧЕСКАЯ КАТАСТРОФА<br/>"
               "И ГУМАНИТАРНОЕ ПОЛОЖЕНИЕ НАРОДА КАРАКАЛПАКСТАНА", 'cover_title'))
    s.append(P("Обращение к международному сообществу", 'cover_sub'))
    s.append(gap(0.3 * cm))
    s.append(P("к Организации Объединённых Наций и её специализированным учреждениям;<br/>"
               "к Организации по безопасности и сотрудничеству в Европе (ОБСЕ);<br/>"
               "к Управлению Верховного комиссара ООН по правам человека (OHCHR);<br/>"
               "к дипломатическим миссиям;<br/>"
               "к правозащитным организациям и независимым журналистам.", 'cover_addr'))
    s.append(gap(0.6 * cm))
    if os.path.exists(ARAL_HIST):
        hist = Image(ARAL_HIST, width=14.0 * cm, height=11.2 * cm)
        hist.hAlign = 'CENTER'
        s.append(hist)
        s.append(gap(0.15 * cm))
        s.append(P("Аральское море: 1977–2014 гг. (спутниковые снимки)", 'cover_addr'))
    else:
        print("ESKERTPE: aralhistori.jpg tabilmadi - tariyxiy suwret qosilmadi.")
    s.append(gap(0.3 * cm))
    s.append(P(DOC_DATE, 'cover_date'))
    s.append(gap(0.3 * cm))
    s.append(rule(GOLD, 1.2))
    s.append(PageBreak())
    return s

# -- Body ---------------------------------------------------------------------
def build_body():
    s = []
    s.append(P("Краткое содержание", 'section'))
    s.append(P("Высыхание Аральского моря — одна из самых тяжёлых экологических "
               "катастроф XX века, вызванная деятельностью человека; учёные нередко "
               "называют её «тихим Чернобылем». Основное бремя последствий легло, "
               "прежде всего, на народ Каракалпакстана, проживающий на южном побережье "
               "бывшего моря (порядка 2 миллионов человек)."))
    s.append(P("Последствия этой катастрофы не знают границ. Солёная и токсичная пыль, "
               "поднимающаяся со дна высохшего моря, распространяется на тысячи "
               "километров и ускоряет таяние горных ледников региона. Одновременно "
               "утрата столь значительного объёма воды оказала воздействие на глубинные "
               "слои Земли, что, как подтверждено научными исследованиями, привело к "
               "смещению участков мантии. Это — по сути, планетарный вызов."))

    s.append(P("II. Токсичная пыль: трансграничная угроза", 'section'))
    s.append(P("Высохшее морское дно превратилось в многолетний накопитель соли, "
               "минеральных отложений, пестицидов и гербицидов, десятилетиями "
               "смывавшихся с хлопковых полей. Сегодня эта поверхность стала источником "
               "распространения химически опасных веществ по всему региону."))
    s.append(P("По научным оценкам, с высохшего дна ежегодно ветром поднимается от 15 "
               "до 75 миллионов тонн солей и токсичных частиц; в отдельных "
               "исследованиях эта цифра превышает 100 миллионов тонн в год. Качество "
               "воздуха ухудшается на расстоянии до 800 километров от источника."))
    s.append(P("Эта пыль — не обычная пустынная пыль. Исследования выявили высокие "
               "концентрации ДДТ, мышьяка, ртути и других токсичных органохлорных "
               "соединений в крови, моче и даже грудном молоке жителей приаралья."))
    s.append(P("Воздействие этой пыли выходит далеко за пределы Каракалпакстана. "
               "Научные исследования и моделирование показывают, что аэрозоли Арала "
               "переносятся на сотни и тысячи километров — до Грузии и даже арктических "
               "побережий; отдельные модели допускают их достижение Гренландии. Ещё "
               "более тревожно то, что токсичная пыль, оседающая на ледниках, вместе с "
               "минерализованными осадками ускоряет таяние горных ледников, питающих "
               "Амударью и Сырдарью, что усиливает риск будущего дефицита воды."))

    s.append(P("III. Влияние на здоровье населения", 'section'))
    s.append(P("Гуманитарное измерение катастрофы проявляется здесь наиболее отчётливо:"))
    s.append(P("<b>Анемия.</b> По данным обследований, основанных на информации "
               "Всемирной организации здравоохранения (ВОЗ), уровень анемии среди женщин "
               "и детей в Каракалпакстане составляет 80–90 % — один из самых высоких "
               "показателей в мире. В отдельных исследованиях уровень анемии среди "
               "беременных женщин достигает 99 %.", 'body_noindent'))
    s.append(P("<b>Туберкулёз.</b> ВОЗ определяет эпидемический порог как 50–70 случаев "
               "на 100 000 человек; в Каракалпакстане этот показатель составляет около "
               "220. Регион также относится к числу мировых лидеров по распространённости "
               "лекарственно-устойчивого туберкулёза (MDR-TB).", 'body_noindent'))
    s.append(P("<b>Младенческая и материнская смертность.</b> Научные данные показывают, "
               "что младенческая смертность в Каракалпакстане составляет 60–110 случаев "
               "на 1000 рождений — значительно выше среднего показателя по Узбекистану "
               "(≈48) и России (≈24).", 'body_noindent'))
    s.append(P("<b>Заболевания дыхательных путей, онкология и врождённые пороки "
               "развития.</b> Из-за токсичной пыли резко выросла заболеваемость "
               "бронхитом, астмой, болезнями почек и печени, онкологическими "
               "заболеваниями и врождёнными аномалиями; острые респираторные "
               "заболевания составляют почти половину случаев детской смертности.",
               'body_noindent'))

    s.append(P("IV. Социально-экономические последствия", 'section'))
    s.append(P("Экономика рыболовства, некогда обеспечивавшая десятки тысяч людей, "
               "полностью разрушена; портовые города, такие как Муйнак, оказались в "
               "сотнях километров от бывшего моря. По оценкам специалистов, катастрофа "
               "вынудила более 100 000 человек покинуть свои дома и затронула здоровье "
               "свыше 5 миллионов жителей региона. Оставшиеся источники воды загрязнены "
               "агрохимикатами, а качество питьевой воды достигло критического уровня."))

    s.append(P("V. Планетарное и историческое значение катастрофы", 'section'))
    s.append(P("<b>Воздействие на земную мантию.</b> Исследование, опубликованное в 2025 "
               "году в журнале Nature Geoscience (Пекинский университет, Университет "
               "Южной Калифорнии), установило, что вследствие высыхания Арала его дно "
               "поднимается примерно на 7 миллиметров в год в радиусе до 500 километров. "
               "Причина — «обратный подъём» земной коры после утраты массы более чем "
               "1000 кубических километров воды. Авторы подчёркивают: деятельность "
               "человека способна влиять даже на глубокие внутренние процессы Земли. Это "
               "наглядно демонстрирует планетарный масштаб происходящей катастрофы.",
               'body_noindent'))
    s.append(P("<b>Наследие биохимического полигона.</b> В 1942–1992 годах на острове "
               "Возрождение (Барсакелмес) действовал советский биохимический "
               "испытательный полигон («Бархан», ПНИЛ-52). По мере высыхания моря этот "
               "объект оказался на суше, что создало дополнительную угрозу экологической "
               "безопасности региона.", 'body_noindent'))

    s.append(P("VI. Водная политика Узбекистана: трансграничный ущерб и потенциально "
               "целенаправленный курс", 'section'))
    s.append(P("<b>Умышленное перекрытие Амударьи.</b> Международные научные наблюдения и "
               "данные с мест свидетельствуют о том, что Узбекистан преднамеренно "
               "блокирует сток Амударьи, препятствуя поступлению воды в Аральское море. "
               "Экспертами рассматриваются две потенциальные цели данных действий:",
               'body_noindent'))
    s.append(P("1. Осушение моря с целью упрощения доступа к добыче полезных ископаемых "
               "(газа, соли, минералов) со дна водоёма. Наличие значительных ресурсов "
               "под пустыней Аралкум подтверждается научными оценками.", 'listitem'))
    s.append(P("2. Создание искусственного дефицита воды для населения Каракалпакстана с "
               "целью вынуждения его к миграции, что позволит установить полный контроль "
               "над землёй и природными богатствами региона. В качестве аргумента, "
               "подтверждающего данную политику, приводится попытка упразднения "
               "суверенного статуса Каракалпакстана в 2022 году.", 'listitem'))
    s.append(P("<b>Проблема прозрачности водохранилищ.</b> Согласно официальным "
               "документам (в частности, отчётам РКИК ООН), в Узбекистане "
               "зарегистрировано 70 искусственных водохранилищ. Однако, по местным "
               "оценкам, их реальное количество превышает 140–150 единиц. Большинство из "
               "этих объектов не отображаются на общедоступных спутниковых картах "
               "(Google Maps), что свидетельствует об их скрытом функционировании. В "
               "связи с этим существует острая необходимость в формировании независимой "
               "комиссии под эгидой ООН для проведения инспекции на местах.",
               'body_noindent'))

    s.append(P("VII. Международно-правовые основания", 'section'))
    s.append(P("Данная проблема уже признана на международном уровне и выходит за рамки "
               "исключительно внутреннего вопроса:"))
    s.append(P("1. 18 мая 2021 года Генеральная Ассамблея ООН единогласно приняла "
               "резолюцию A/RES/75/278, объявив Приаралье зоной экологических инноваций "
               "и технологий.", 'listitem'))
    s.append(P("2. В 1993 году государства региона учредили Международный фонд спасения "
               "Арала (МФСА); в структуре ООН также функционировал Многопартнёрский "
               "трастовый фонд по человеческой безопасности для региона Приаралья.",
               'listitem'))
    s.append(P("3. 28 июля 2022 года Генеральная Ассамблея ООН резолюцией A/RES/76/300 "
               "признала право на чистую, здоровую и устойчивую окружающую среду в "
               "качестве одного из фундаментальных прав человека. Ситуация в Приаралье "
               "напрямую связана с реализацией данного права.", 'listitem'))
    s.append(P("Таким образом, этот кризис не является сугубо внутренним делом "
               "Узбекистана. Во-первых, трансграничный перенос пыли и токсичных веществ "
               "оказывает негативное воздействие на территорию нескольких государств "
               "(трансграничный экологический ущерб). Во-вторых, права человека — включая "
               "право на охрану здоровья и благоприятную окружающую среду — защищены "
               "нормами международного права и не могут рассматриваться исключительно как "
               "внутреннее дело государства. На основании этих двух факторов "
               "экологическая катастрофа Приаралья на законных основаниях должна "
               "оставаться в центре внимания международного сообщества."))

    s.append(P("VIII. Историко-правовой экскурс: Восстановление суверенного статуса "
               "Каракалпакстана", 'section'))
    s.append(P("14 декабря 1990 года Верховный Совет Каракалпакской АССР (Постановление "
               "№ 82/XII, Председатель Т. Ешимбетова) принял «Декларацию о "
               "государственном суверенитете». В её преамбуле зафиксировано:"))
    s.append(P("«Проявляя заботу о развитии народов и решении экологических проблем, "
               "вызванных высыханием Аральского моря, учитывая крайне низкий уровень "
               "жизни граждан, проживающих в самом эпицентре экологической "
               "катастрофы…»", 'quote'))
    s.append(P("Данная Декларация является историческим документом, определившим "
               "самостоятельный политико-правовой статус Каракалпакстана. Кроме того, "
               "Каракалпакстан закреплён в качестве суверенной республики в самой "
               "Конституции Республики Узбекистан."))
    s.append(P("<b>Обращение к международному сообществу:</b> Восстановление суверенного "
               "статуса Каракалпакстана, принятого 14 декабря 1990 года, в соответствии "
               "с нормами международного права. Настоящее предложение соответствует "
               "современной международной практике и прецедентам (в частности, на примере "
               "Латвийской Республики). Данный шаг может послужить оптимальным путём для "
               "оперативного и качественного разрешения одного из крупнейших глобальных "
               "кризисов. Голос региона, понесшего наибольший ущерб, должен быть услышан "
               "в данном вопросе напрямую.", 'body_noindent'))

    s.append(P("IX. Требования и предложения", 'section'))
    s.append(P("На основании изложенных выше фактов мы обращаемся к международному "
               "сообществу со следующими просьбами:"))
    reqs = [
        ("Независимый мониторинг.", "Организовать в Каракалпакстане независимый "
         "экологический и медицинский мониторинг с участием международных экспертов; "
         "при необходимости направить техническую миссию ООН."),
        ("Точная проверка водных ресурсов.", "Создать под эгидой ООН надёжную комиссию "
         "для проведения точной проверки фактического количества водохранилищ в "
         "Узбекистане. Необходимо установить, действительно ли их число превышает "
         "140–150, а не 70, как указано официально."),
        ("Прозрачность и подотчётность финансов.", "Обеспечить публикацию открытых, "
         "аудированных отчётов о том, как и на что расходуются международные средства и "
         "гранты, выделенные на Арал; гарантировать, что помощь достигает пострадавшего "
         "населения."),
        ("Целевые гуманитарные программы.", "Поддержать программы, направленные на "
         "обеспечение чистой питьевой водой, лечение туберкулёза и анемии, защиту "
         "здоровья матерей и детей."),
        ("Голос местного населения и свобода прессы.", "Обеспечить участие "
         "представителей местного населения и журналистов в процессах принятия решений; "
         "гарантировать безопасный и беспрепятственный доступ наблюдателей и прессы."),
        ("Постоянное внимание.", "Сохранить данный кризис в зоне устойчивого "
         "международного контроля, а не временного интереса."),
        ("Восстановление суверенного статуса Каракалпакстана.", "На основании Декларации "
         "от 14 декабря 1990 года и в соответствии с международным правом восстановить "
         "суверенный статус Каракалпакстана (по примеру Латвии). Это станет надёжной "
         "правовой основой для быстрого и эффективного решения аральской проблемы."),
    ]
    for i, (head, txt) in enumerate(reqs, 1):
        s.append(P("%d. <b>%s</b> %s" % (i, head, txt), 'listitem'))

    s.append(P("Заключение", 'section'))
    s.append(P("Аральская катастрофа — это не только история исчезающего моря. Прежде "
               "всего, это история миллионов людей, которые ежедневно вынуждены жить в "
               "условиях болезней, загрязнённой воды и воздуха, а также утраты привычного "
               "образа жизни и источников существования. Право этих людей на здоровье, "
               "безопасную питьевую воду и благоприятную окружающую среду является "
               "неотъемлемой частью универсальных прав человека."))
    s.append(P("Мы представляем данные факты на основе имеющихся доказательств и "
               "достоверных источников информации и призываем международное сообщество к "
               "сотрудничеству, солидарности и практической поддержке в преодолении "
               "последствий данной катастрофы."))
    s.append(P("<b>Народ Каракалпакстана заслуживает внимания, справедливого отношения и "
               "достойного будущего.</b>", 'body_noindent'))

    # -- Источники (с гиперссылками) --
    s.append(P("Источники", 'src_head'))
    SOURCES = [
        ("Aral Sea tragedy: causes, impacts and possible solutions — Kun.uz, 2024.",
         "https://kun.uz/en/news/2024/08/01/aral-sea-tragedy-causes-impacts-and-possible-solutions"),
        ("Greening the Desert — World Bank, 2024 (Aralkum ≈ 60 000 km²).",
         "https://www.worldbank.org/en/news/feature/2024/12/04/greening-the-desert-the-role-of-landscape-restoration-in-uzbekistan-s-battle-against-sand-and-dust-storms"),
        ("Dust emission and environmental changes in the Aral Sea — Aeolian Research / ScienceDirect, 2015.",
         "https://www.sciencedirect.com/science/article/abs/pii/S1875963715000282"),
        ("Aralkum: world's newest desert — Atlas Obscura (NASA: &gt;100 million tons salt dust/year).",
         "https://www.atlasobscura.com/articles/aralkum-worlds-newest-desert"),
        ("What Is Happening to the Aral Sea — ScienceInsights, 2026 (ДДТ, мышьяк, ртуть в крови/моче/грудном молоке).",
         "https://scienceinsights.org/what-is-happening-to-the-aral-sea-collapse-restoration/"),
        ("Dust emission and transport in the Aral Sea region — Geoderma / ScienceDirect, 2022 (перенос в Грузию, Арктику; моделирование — до Гренландии).",
         "https://www.sciencedirect.com/science/article/pii/S0016706122004840"),
        ("Aral Sea — Columbia University / LDEO (токсичная пыль на ледниках ускоряет таяние).",
         "https://www.ldeo.columbia.edu/~martins/hydro/case_studies/aral_sea.html"),
        ("Uzbekistan: Focus on health impact of Aral Sea crisis — IRIN / ReliefWeb (ВОЗ: 80–90% анемии).",
         "https://reliefweb.int/report/uzbekistan/uzbekistan-focus-health-impact-aral-sea-crisis"),
        ("The Aral Sea Crisis — Columbia University (анемия до 99% у беременных женщин).",
         "http://www.columbia.edu/~tmt2120/impacts%20to%20life%20in%20the%20region.htm"),
        ("The Aral Sea disappears while tuberculosis climbs — MSF (туберкулёз ≈ 220/100 000).",
         "https://www.msf.org/aral-sea-disappears-while-tuberculosis-climbs"),
        ("Central Asia: Aral Sea crisis continues to erode health — ReliefWeb / MSF (MDR-TB).",
         "https://reliefweb.int/report/kazakhstan/central-asia-aral-sea-crisis-continues-erode-health"),
        ("The Aral Sea disaster and self-rated health — Health &amp; Place / ScienceDirect, 2002 (младенческая смертность 60–110/1000).",
         "https://www.sciencedirect.com/science/article/abs/pii/S1353829202000175"),
        ("The Aral Sea Crisis — Columbia University (&gt;100 000 переселённых; &gt;5 миллионов пострадавших).",
         "http://www.columbia.edu/~tmt2120/impacts%20to%20life%20in%20the%20region.htm"),
        ("Fan, W., Wang, T., Barbot, S., Luo, H. — Nature Geoscience, 2025. DOI: 10.1038/s41561-025-01664-w.",
         "https://doi.org/10.1038/s41561-025-01664-w"),
        ("Возрождение / «Бархан» (ПНИЛ-52), советский биохимический полигон — starcom68.livejournal.com.",
         "https://starcom68.livejournal.com/3085390.html"),
        ("UN General Assembly Resolution A/RES/75/278, 18.05.2021 — UN Digital Library; UNDP MPTF Office.",
         "https://digitallibrary.un.org/record/3928288"),
        ("UN General Assembly Resolution A/RES/76/300, 28.07.2022 (право на чистую, здоровую окружающую среду).",
         "https://digitallibrary.un.org/record/3983329"),
        ("«Декларация о государственном суверенитете» — Верховный Совет Каракалпакской АССР, Постановление № 82/XII, 14.12.1990.",
         "https://karakalpakvoice.org/declaration"),
        ("Конституция Республики Узбекистан — статус Каракалпакстана как суверенной республики (Статья 85).",
         "https://constitution.uz/ru/clause/index#section20"),
        ("Uzbekistan SAP Water — UNFCCC, 2023 (70 официальных водохранилищ).",
         "https://unfccc.int/sites/default/files/resource/Uzbekistan_SAP_Buildings_RUS.pdf"),
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
        title="Аральская экологическая катастрофа — Обращение",
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