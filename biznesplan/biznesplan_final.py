# ============================================================
# BIZNES-PLAN PDF Generator
# Wymagania: pip install reportlab
# Uruchomienie: python biznesplan_final.py
# ============================================================

from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table,
    TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ------------------------------------------------------------
# ШРИФТТЕР — DejaVu (Polish символдарын қолдайды)
# Windows-та жолдарды өзгертіңіз, мысалы:
#   'C:/Windows/Fonts/arial.ttf'
# ------------------------------------------------------------
pdfmetrics.registerFont(TTFont('DJ',  'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('DJB', 'C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFont(TTFont('DJI', 'C:/Windows/Fonts/ariali.ttf'))

# ------------------------------------------------------------
# СТИЛЬДЕР
# ------------------------------------------------------------
S_TITLE  = ParagraphStyle('S_TITLE',  fontName='DJB', fontSize=14, leading=20, spaceAfter=4,  alignment=1)
S_SUB    = ParagraphStyle('S_SUB',    fontName='DJ',  fontSize=10, leading=14, spaceAfter=4,  alignment=1)
S_ART    = ParagraphStyle('S_ART',    fontName='DJ',  fontSize=8.5,leading=12, spaceAfter=10, alignment=1, textColor=colors.HexColor('#555555'))
S_H1     = ParagraphStyle('S_H1',     fontName='DJB', fontSize=11, leading=16, spaceBefore=14,spaceAfter=6)
S_BODY   = ParagraphStyle('S_BODY',   fontName='DJ',  fontSize=9.5,leading=14, spaceAfter=5)
S_BULL   = ParagraphStyle('S_BULL',   fontName='DJ',  fontSize=9.5,leading=13, spaceAfter=3,  leftIndent=14)
S_THDR   = ParagraphStyle('S_THDR',   fontName='DJB', fontSize=9,  leading=13, textColor=colors.white)
S_TCELL  = ParagraphStyle('S_TCELL',  fontName='DJ',  fontSize=8.5,leading=12)
S_TCELLB = ParagraphStyle('S_TCELLB', fontName='DJB', fontSize=9,  leading=13)

DARK  = colors.HexColor('#1e1e1e')
GREY1 = colors.HexColor('#f5f5f5')
GREY2 = colors.HexColor('#ffffff')
LINE  = colors.HexColor('#cccccc')

def HR():
    return HRFlowable(width='100%', thickness=0.5, color=LINE, spaceBefore=6, spaceAfter=8)

def SP(n=8):
    return Spacer(1, n)

def H(txt):
    return Paragraph(txt, S_H1)

def P(txt):
    return Paragraph(txt, S_BODY)

def B(txt):
    return Paragraph(f'• {txt}', S_BULL)

# Кесте тақырыбы жасаушы (ақ мәтін, қара фон)
def TH(txt):
    return Paragraph(txt, S_THDR)

def TC(txt):
    return Paragraph(txt, S_TCELL)

def TCB(txt):
    return Paragraph(txt, S_TCELLB)

# ------------------------------------------------------------
# НЕГІЗГІ КЕСТЕ СТИЛІ
# ------------------------------------------------------------
BASE_TABLE = TableStyle([
    # Тақырып жолы: қара фон, АҚ мәтін
    ('BACKGROUND',   (0, 0), (-1, 0), DARK),
    ('TEXTCOLOR',    (0, 0), (-1, 0), colors.white),
    ('FONTNAME',     (0, 0), (-1, 0), 'DJB'),
    ('FONTSIZE',     (0, 0), (-1, 0), 9),
    # Деректер жолдары
    ('FONTNAME',     (0, 1), (-1, -1), 'DJ'),
    ('FONTSIZE',     (0, 1), (-1, -1), 8.5),
    ('ROWBACKGROUNDS',(0, 1), (-1, -1), [GREY2, GREY1]),
    # Тор
    ('GRID',         (0, 0), (-1, -1), 0.4, LINE),
    # Padding
    ('TOPPADDING',   (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING',(0, 0), (-1, -1), 5),
    ('LEFTPADDING',  (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('VALIGN',       (0, 0), (-1, -1), 'TOP'),
])

# ------------------------------------------------------------
# PDF ҚҰРУ
# ------------------------------------------------------------
def build():
    out = 'biznesplan_UP_final.pdf'
    doc = SimpleDocTemplate(
        out, pagesize=A4,
        leftMargin=2.5*cm, rightMargin=2.5*cm,
        topMargin=2.5*cm,  bottomMargin=2.5*cm
    )
    story = []

    # ── ТАҚЫРЫП БЛОГЫ ──────────────────────────────────────
    story.append(Paragraph('BIZNES-PLAN', S_TITLE))
    story.append(Paragraph('WNIOSEK O PRZYZNANIE ŚRODKÓW NA PODJĘCIE DZIAŁALNOŚCI GOSPODARCZEJ', S_SUB))
    story.append(Paragraph('art. 46 ust. 1 pkt 2 Ustawy o promocji zatrudnienia i instytucjach rynku pracy', S_ART))
    story.append(HR())
    story.append(SP(4))

    # ── 1. DANE WNIOSKODAWCY ───────────────────────────────
    story.append(H('1. DANE WNIOSKODAWCY'))
    # ИСПРАВЛЕНИЕ 1: барлық мән бос — ручкамен толтыру үшін
    dane_rows = [
        ['Imię i nazwisko',        ''],
        ['PESEL',                  ''],
        ['Adres zamieszkania',     ''],
        ['Telefon',                ''],
        ['Wykształcenie',          ''],
        ['Doświadczenie zawodowe', ''],
    ]
    dane_data = [
        [Paragraph(r[0], S_TCELLB), Paragraph(r[1], S_TCELL)]
        for r in dane_rows
    ]
    t_dane = Table(dane_data, colWidths=[5.5*cm, 11*cm])
    t_dane.setStyle(TableStyle([
        ('BACKGROUND',    (0, 0), (0, -1), GREY1),
        ('FONTNAME',      (0, 0), (0, -1), 'DJB'),
        ('FONTNAME',      (1, 0), (1, -1), 'DJ'),
        ('FONTSIZE',      (0, 0), (-1, -1), 9),
        ('LEADING',       (0, 0), (-1, -1), 13),
        ('GRID',          (0, 0), (-1, -1), 0.4, LINE),
        ('TOPPADDING',    (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('LEFTPADDING',   (0, 0), (-1, -1), 6),
        ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(t_dane)
    story.append(HR())

    # ── 2. OPIS PLANOWANEJ DZIAŁALNOŚCI ───────────────────
    story.append(H('2. OPIS PLANOWANEJ DZIAŁALNOŚCI'))
    story.append(P('<b>Forma prawna:</b> Jednoosobowa działalność gospodarcza (JDG)'))
    story.append(SP(4))
    story.append(P('<b>Kody PKD:</b>'))
    story.append(B('43.31.Z – Tynkowanie (działalność przeważająca)'))
    story.append(B('43.34.Z – Malowanie i szklenie'))
    story.append(B('43.39.Z – Pozostałe roboty budowlane wykończeniowe'))
    story.append(SP(4))
    story.append(P('<b>Siedziba firmy:</b> Warszawa i aglomeracja warszawska'))
    story.append(SP(6))
    story.append(P(
        'Projekt zakłada uruchomienie firmy świadczącej zmechanizowane i zautomatyzowane '
        'usługi wykończeniowe w zakresie tynków wewnętrznych oraz malowania hydrodynamicznego. '
        'Zastosowanie agregatów tynkarskich, robotów do zacierania oraz systemów natryskowych '
        'pozwala na uzyskanie wysokiej jakości powierzchni (standard Q3/Q4) przy skróceniu czasu '
        'realizacji o ok. 60% w porównaniu z metodami tradycyjnymi.'
    ))
    story.append(P(
        'Automatyzacja procesów oznacza, że jakość wykonania nie zależy od manualnych umiejętności, '
        'lecz od prawidłowej obsługi maszyn — co umożliwia szybkie wdrożenie właściciela firmy '
        'bez wieloletniego stażu w rzemiośle.'
    ))
    story.append(HR())

    # ── 3. ANALIZA RYNKU I KONKURENCJI ────────────────────
    story.append(H('3. ANALIZA RYNKU I KONKURENCJI'))
    story.append(P(
        '<b>Lokalizacja:</b> Warszawa i obszar metropolitalny — region o największej dynamice '
        'inwestycji mieszkaniowych w Polsce.'
    ))
    story.append(SP(4))
    story.append(P(
        '<b>Zapotrzebowanie rynkowe:</b> Według danych GUS liczba wydanych pozwoleń na budowę '
        'w woj. mazowieckim wzrosła o ok. 25% r/r. Liczba realizowanych inwestycji deweloperskich '
        'przekracza 40 000 mieszkań rocznie tylko w Warszawie, generując stały popyt na usługi '
        'wykończeniowe.'
    ))
    story.append(SP(4))
    story.append(P('<b>Grupy docelowe:</b>'))
    story.append(B('deweloperzy i generalni wykonawcy (stałe zlecenia na etap wykończenia),'))
    story.append(B('firmy budowlane zlecające podwykonawstwo,'))
    story.append(B('klienci indywidualni (mieszkania w stanie deweloperskim).'))
    story.append(SP(6))
    story.append(P('<b>Przewagi konkurencyjne:</b>'))
    story.append(B('Terminowość: skrócenie czasu realizacji o ok. 60% dzięki automatyzacji.'))
    story.append(B('Jakość: powierzchnie gotowe pod malowanie bez konieczności poprawek (standard Q3/Q4).'))
    story.append(B('Ekologia: redukcja zużycia materiałów o ok. 15% dzięki precyzyjnemu dozowaniu.'))
    story.append(B('Powtarzalność: jednolita jakość niezależna od doświadczenia pracownika.'))
    story.append(HR())

    # ── 4. UZASADNIENIE CELOWOŚCI ZAKUPÓW ─────────────────
    story.append(H('4. UZASADNIENIE CELOWOŚCI ZAKUPÓW'))
    story.append(P(
        'Każdy element wyposażenia tworzy spójny ciąg technologiczny: agregat nakłada materiał, '
        'robot go zaciera, system malarski wykańcza powierzchnię, szlifierka zapewnia bezpyłową '
        'obróbkę, a laser 3D gwarantuje precyzję pomiarów.'
    ))
    story.append(P(
        'Taka konfiguracja minimalizuje błędy ludzkie, skraca czas realizacji i umożliwia szybkie '
        'wdrożenie właściciela bez wieloletniego doświadczenia w rzemiośle.'
    ))
    story.append(P(
        '<b>Brak możliwości sfinansowania inwestycji ze środków własnych</b> wynika z sytuacji '
        'finansowej wnioskodawcy, który pozostaje bez zatrudnienia i nie dysponuje oszczędnościami '
        'wystarczającymi na zakup specjalistycznego sprzętu. Wsparcie ze środków Funduszu Pracy '
        'jest niezbędne do uruchomienia działalności.'
    ))
    story.append(P(
        'Zakupiony sprzęt stanowi trwały środek produkcji zapewniający ciągłość działalności '
        'przez minimum 12 miesięcy.'
    ))
    story.append(HR())

    # ── 5. HARMONOGRAM RZECZOWO-FINANSOWY ─────────────────
    # ИСПРАВЛЕНИЕ 2: KeepTogether — бүкіл кесте (SUMA қосқанда) бір бетте
    harm_header = H('5. HARMONOGRAM RZECZOWO-FINANSOWY (50 000 PLN)')

    harm_rows = [
        # Тақырып жолы
        [TH('Lp.'), TH('Przedmiot inwestycji'), TH('Funkcja i wpływ na innowacyjność'), TH('Koszt brutto')],
        # Деректер
        [TC('1'), TC('Agregat tynkarski\n(Kaleta 5 / PFT G4)'),
         TC('Automatyczne mieszanie i podawanie zaprawy;\nwysoka jednorodność materiału'), TC('24 500 PLN')],
        [TC('2'), TC('Robot do zacierania\ntynków'),
         TC('Eliminacja ciężkiej pracy fizycznej;\nidealna gładkość powierzchni'), TC('9 000 PLN')],
        [TC('3'), TC('Agregat malarski\nhydrodynamiczny'),
         TC('Malowanie do 500 m² dziennie;\noszczędne zużycie farby'), TC('6 500 PLN')],
        [TC('4'), TC('System szlifierski\nz odciągiem pyłu'),
         TC('Bezpyłowa obróbka powierzchni;\nzgodność z przepisami BHP'), TC('4 500 PLN')],
        [TC('5'), TC('Laser płaszczyznowy\n3D (zielony)'),
         TC('Precyzyjne wyznaczanie płaszczyzn\ni poziomów'), TC('2 500 PLN')],
        [TC('6'), TC('Zestaw narzędzi\nwykończeniowych'),
         TC('Obróbka narożników i detali\nniemożliwa maszynowo'), TC('3 000 PLN')],
        # SUMA жолы
        [TCB('SUMA'), TC(''), TC(''), TCB('50 000 PLN')],
    ]

    t_harm = Table(harm_rows, colWidths=[1.2*cm, 4.5*cm, 8.2*cm, 2.6*cm])
    harm_style = TableStyle([
        # ── Тақырып жолы (0): қара фон + АҚ мәтін ──────
        ('BACKGROUND',    (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR',     (0, 0), (-1, 0), colors.white),   # ← АҚ мәтін
        ('FONTNAME',      (0, 0), (-1, 0), 'DJB'),
        ('FONTSIZE',      (0, 0), (-1, 0), 9),
        # ── Деректер жолдары ────────────────────────────
        ('FONTNAME',      (0, 1), (-1, -2), 'DJ'),
        ('FONTSIZE',      (0, 1), (-1, -1), 8.5),
        ('ROWBACKGROUNDS',(0, 1), (-1, -2), [GREY2, GREY1]),
        # ── SUMA жолы ───────────────────────────────────
        ('BACKGROUND',    (0, -1), (-1, -1), colors.HexColor('#e0e0e0')),
        ('FONTNAME',      (0, -1), (-1, -1), 'DJB'),
        # ── Тор ────────────────────────────────────────
        ('GRID',          (0, 0), (-1, -1), 0.4, LINE),
        # ── Padding ────────────────────────────────────
        ('TOPPADDING',    (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING',   (0, 0), (-1, -1), 5),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 5),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
        ('ALIGN',         (0, 0), (0, -1), 'CENTER'),
        ('ALIGN',         (3, 0), (3, -1), 'RIGHT'),
    ])
    t_harm.setStyle(harm_style)

    # KeepTogether: тақырып + кесте = бір бетте
    story.append(KeepTogether([harm_header, SP(4), t_harm]))
    story.append(HR())

    # ── 6. PLAN ZATRUDNIENIA ───────────────────────────────
    story.append(H('6. PLAN ZATRUDNIENIA'))
    story.append(P(
        'Przedsiębiorstwo prowadzone będzie przez właściciela jako jednoosobowa działalność '
        'gospodarcza. W miarę wzrostu przychodów planowane jest stopniowe zatrudnianie pracowników '
        'skierowanych przez Urząd Pracy, co bezpośrednio realizuje cele aktywizacyjne.'
    ))
    story.append(P(
        'Wnioskodawca zobowiązuje się do prowadzenia działalności i osobistego świadczenia usług '
        'przez minimum 12 miesięcy od daty rejestracji.'
    ))
    story.append(HR())

    # ── 7. PROJEKCJA FINANSOWA ────────────────────────────
    story.append(H('7. PROJEKCJA FINANSOWA'))
    story.append(P('<b>Faza rozruchu (miesiące 1–3):</b>'))
    story.append(SP(4))

    # ИСПРАВЛЕНИЕ 3: қаржы кестесі — АҚ мәтін тақырып жолы
    fin_rows = [
        [TH('Miesiąc'), TH('Przychody'), TH('Koszty operacyjne'), TH('Zysk netto')],
        [TC('1'), TC('8 000 PLN'),  TC('6 000 PLN'), TC('2 000 PLN')],
        [TC('2'), TC('14 000 PLN'), TC('7 000 PLN'), TC('7 000 PLN')],
        [TC('3'), TC('20 000 PLN'), TC('8 000 PLN'), TC('12 000 PLN')],
    ]
    t_fin = Table(fin_rows, colWidths=[2.5*cm, 4.5*cm, 5*cm, 4.5*cm])
    fin_style = TableStyle([
        ('BACKGROUND',    (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR',     (0, 0), (-1, 0), colors.white),   # ← АҚ мәтін
        ('FONTNAME',      (0, 0), (-1, 0), 'DJB'),
        ('FONTSIZE',      (0, 0), (-1, 0), 9),
        ('FONTNAME',      (0, 1), (-1, -1), 'DJ'),
        ('FONTSIZE',      (0, 1), (-1, -1), 9),
        ('ROWBACKGROUNDS',(0, 1), (-1, -1), [GREY2, GREY1]),
        ('GRID',          (0, 0), (-1, -1), 0.4, LINE),
        ('TOPPADDING',    (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING',   (0, 0), (-1, -1), 6),
        ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN',         (0, 0), (0, -1), 'CENTER'),
    ])
    t_fin.setStyle(fin_style)
    story.append(t_fin)
    story.append(SP(8))

    story.append(P('<b>Faza stabilizacji (od miesiąca 4):</b>'))
    story.append(B('Przychody: 20 000–30 000 PLN/mies. (ok. 400–600 m² tynków)'))
    story.append(B('Koszty operacyjne: ok. 10 000 PLN (materiały, transport, ZUS, eksploatacja)'))
    story.append(B('Zysk netto: 10 000–18 000 PLN/mies.'))
    story.append(SP(4))
    story.append(P(
        'Działalność osiąga pełną płynność finansową od 2. miesiąca działania, co gwarantuje '
        'terminowe wywiązywanie się ze zobowiązań przez cały wymagany okres 12 miesięcy.'
    ))
    story.append(HR())

    # ── 8. TRWAŁOŚĆ PROJEKTU ──────────────────────────────
    story.append(H('8. TRWAŁOŚĆ PROJEKTU'))
    story.append(P('Wnioskodawca zobowiązuje się do:'))
    story.append(B('prowadzenia działalności przez minimum 12 miesięcy od daty rejestracji,'))
    story.append(B('niezbywania zakupionego sprzętu przez okres wskazany w umowie,'))
    story.append(B('niezawieszania i niezaprzestania działalności w wymaganym okresie.'))
    story.append(HR())

    # ── 9. INNOWACYJNOŚĆ, EKOLOGIA I BHP ─────────────────
    story.append(H('9. INNOWACYJNOŚĆ, EKOLOGIA I BHP'))
    story.append(B(
        'Innowacyjność: zastosowanie technologii maszynowych zamiast pracy ręcznej; '
        'podejście rzadkie wśród małych firm wykończeniowych.'
    ))
    story.append(B(
        'Ekologia: zmniejszenie zużycia materiałów o ok. 15%; mniejsza ilość odpadów budowlanych.'
    ))
    story.append(B(
        'BHP: system szlifierski z odciągiem pyłu eliminuje ekspozycję na pyły budowlane '
        '(zgodność z PN-EN 12779).'
    ))
    story.append(HR())

    # ── 10. OŚWIADCZENIE WNIOSKODAWCY ─────────────────────
    story.append(H('10. OŚWIADCZENIE WNIOSKODAWCY'))
    story.append(P('Oświadczam, że:'))
    story.append(B('1. Nie korzystałem/am z bezzwrotnych środków publicznych na podjęcie działalności gospodarczej.'))
    story.append(B('2. Nie posiadałem/am wpisu w CEIDG ani KRS w ciągu ostatnich 12 miesięcy.'))
    story.append(B('3. Nie prowadzę działalności na podstawie umowy o pracę nakładczą.'))
    story.append(B('4. Jestem świadomy/a odpowiedzialności za podanie nieprawdziwych informacji.'))
    story.append(SP(24))

    sign = Table(
        [['Data: ................................', 'Podpis: ................................']],
        colWidths=[8*cm, 8.5*cm]
    )
    sign.setStyle(TableStyle([
        ('FONTNAME',  (0, 0), (-1, -1), 'DJ'),
        ('FONTSIZE',  (0, 0), (-1, -1), 9),
        ('ALIGN',     (1, 0), (1, 0),   'RIGHT'),
        ('TOPPADDING',(0, 0), (-1, -1), 4),
        ('BOX',       (0, 0), (-1, -1), 0, colors.white),
    ]))
    story.append(sign)

    # ── САҚТАУ ────────────────────────────────────────────
    doc.build(story)
    print(f'✅ PDF сәтті жасалды: {out}')

# ── ІСКЕ ҚОСУ ─────────────────────────────────────────────
if __name__ == '__main__':
    build()