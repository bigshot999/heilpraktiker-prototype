export type FaqItem = {
  question: string
  answer: string
  category: 'Allgemein' | 'Kosten & Versicherung' | 'Behandlung' | 'Erste Schritte'
}

export const faqItems: FaqItem[] = [
  { category: 'Allgemein', question: 'Für wen ist die Naturheilkunde geeignet?', answer: 'Die Naturheilkunde ist für Menschen jeden Alters geeignet — ob bei chronischen Beschwerden, zur Vorbeugung oder als Ergänzung zur schulmedizinischen Behandlung. Besonders hilfreich ist sie, wenn konventionelle Therapien keine zufriedenstellenden Ergebnisse gebracht haben.' },
  { category: 'Kosten & Versicherung', question: 'Übernimmt meine Krankenkasse die Kosten?', answer: 'Gesetzliche Krankenkassen übernehmen die Kosten für Heilpraktiker-Behandlungen in der Regel nicht. Viele private Krankenversicherungen und einige gesetzliche Zusatzversicherungen erstatten jedoch einen Teil. Ich stelle Ihnen nach jeder Behandlung eine Rechnung nach dem GebüH aus.' },
  { category: 'Erste Schritte', question: 'Wie läuft das kostenlose Erstgespräch ab?', answer: 'Das Erstgespräch dauert ca. 15 Minuten und ist völlig kostenlos. Wir sprechen darüber, was Sie beschäftigt, was Sie sich von einer Behandlung erhoffen, und ob und wie ich Ihnen helfen kann. Kein Druck, keine Verpflichtung — einfach ein offenes Gespräch.' },
  { category: 'Behandlung', question: 'Wie lange dauert eine Behandlung?', answer: 'Das Erstgespräch dauert ca. 60–90 Minuten, Folgetermine ca. 30–60 Minuten — je nach Behandlungsmethode. Ich nehme mir die Zeit, die Sie brauchen.' },
  { category: 'Behandlung', question: 'Wie viele Sitzungen brauche ich?', answer: 'Das hängt von Ihren Beschwerden und Ihrer Konstitution ab. Bei akuten Beschwerden oft 1–3 Sitzungen, bei chronischen Erkrankungen empfehle ich meist eine Begleitung über mehrere Monate. Nach dem Erstgespräch kann ich Ihnen eine realistische Einschätzung geben.' },
  { category: 'Allgemein', question: 'Was unterscheidet Sie von einem Arzt?', answer: 'Als Heilpraktikerin darf ich diagnostizieren und behandeln, verschreibe aber keine verschreibungspflichtigen Medikamente. Mein Fokus liegt auf ganzheitlichen, natürlichen Methoden. Ich sehe mich als Ergänzung zur Schulmedizin — nicht als Ersatz.' },
  { category: 'Kosten & Versicherung', question: 'Was kostet eine Behandlung?', answer: 'Eine Erstanamnese kostet ca. 120–150 €, Folgetermine ca. 60–90 €. Die genauen Kosten besprechen wir beim kostenlosen Erstgespräch. Ich rechne nach der Gebührenordnung für Heilpraktiker (GebüH) ab.' },
  { category: 'Behandlung', question: 'Muss ich Medikamente absetzen?', answer: 'Nein — bitte setzen Sie keine verschriebenen Medikamente ohne Rücksprache mit Ihrem Arzt ab. Naturheilkundliche Behandlungen lassen sich in den meisten Fällen gut mit schulmedizinischen Therapien kombinieren.' },
  { category: 'Erste Schritte', question: 'Wie kann ich einen Termin buchen?', answer: 'Am einfachsten über das Kontaktformular auf dieser Website — ich melde mich innerhalb von 24 Stunden. Sie können mich auch telefonisch oder per E-Mail erreichen.' },
  { category: 'Allgemein', question: 'Behandeln Sie auch Kinder?', answer: 'Ja, ich behandle Kinder ab 3 Jahren. Naturheilkundliche Methoden sind besonders schonend und gut für Kinder geeignet. Für das Erstgespräch kommen die Eltern gemeinsam mit dem Kind.' },
]
