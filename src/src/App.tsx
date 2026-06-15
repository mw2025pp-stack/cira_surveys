import React, { useState, useEffect } from 'react';
import { ChevronLeft, Check, Download, Lock, Eye, Plus, X, Sparkles, Stethoscope, AlertCircle, Trash2, Droplet } from 'lucide-react';

// ====== BRAND (CIRA — Navy + Light Blue + Silver) ======
const BRAND = {
  navy: '#1E3A8A',
  navyDark: '#172554',
  blue: '#3B82F6',
  blueLight: '#DBEAFE',
  blueLighter: '#EFF6FF',
  silver: '#94A3B8',
  silverLight: '#CBD5E1',
  cream: '#F8FAFC',
  text: '#0F172A',
  textLight: '#64748B',
  border: '#E2E8F0',
};

// ====== PROCEDURES MASTER LIST ======
const PROCEDURES = {
  'الحقن (الفيلر والبوتكس)': [
    'حقن الفيلر',
    'حقن البوتكس للوجه',
    'بوتكس فرط التعرق',
    'حقن الكورتيزون الموضعي (Intralesional)',
    'إذابة الفيلر'
  ],
  'محفزات الكولاجين والنضارة': [
    'محفزات الكولاجين (Biostimulators)',
    'حقن البلازما (PRP)',
    'حقن السكن بوستر (Skin Boosters)',
    'حقن الاكسوزوم (Exosome)',
    'إبر النضارة',
    'الخيوط (Threads)'
  ],
  'علاج البشرة': [
    'علاج التصبغات والكلف',
    'علاج حب الشباب وآثاره',
    'علاج علامات التمدد',
    'التفتيح',
    'التقشير (Peeling)',
    'Microneedling',
    'Dermabrasion',
    'علاج مشاكل ترهل الجلد',
    'علاج الوردية'
  ],
  'علاج الشعر': [
    'علاج تساقط الشعر',
    'الفحص الدقيق بالديرموسكوب',
    'محفزات نمو الشعر',
    'ريجينيرا (Regenera)',
    'ACell',
    'بلازما الشعر'
  ],
  'الليزر': [
    'العلاج بالليزر الشامل',
    'إزالة التاتو',
    'إعادة تجديد البشرة بالليزر',
    'إزالة الشعر بالليزر',
    'علاج الأوعية الدموية'
  ],
  'الفحص والاستشارة': [
    'كشف أمراض الجلدية',
    'استشارة تجميلية',
    'كشف شعر'
  ]
};

// ====== DEVICES MASTER LIST ======
const DEVICES = {
  'الأجهزة المتوفرة في عيادة سيرا': [
    'Potenza (بوتنزا)',
    'Clarity II (كلاريتي 2)',
    'Helios 3 (هيليوس 3)'
  ]
};

// ====== DOCTORS ======
const DOCTORS = [
  {
    id: 'hadeer',
    name: 'د. هدير اليماني',
    nameEn: 'Dr. Hadeer Elyamany',
    title: 'نائب أمراض الجلدية والتجميل',
    experience: '12 سنة',
    university: 'القاهرة - القصر العيني'
  },
  {
    id: 'heba',
    name: 'د. هبه حجازي',
    nameEn: 'Dr. Heba Hagazy',
    title: 'استشارية أمراض جلدية وتجميل وليزر',
    experience: 'أكثر من 10 سنوات',
    university: 'جامعة الإسكندرية'
  },
  {
    id: 'mona',
    name: 'د. منى النجار',
    nameEn: 'Dr. Mona Elnaggar',
    title: 'Dermatologist',
    experience: '11 سنة',
    university: 'جامعة عين شمس'
  },
  {
    id: 'eman',
    name: 'د. إيمان صلاح',
    nameEn: 'Dr. Eman Salah',
    title: 'Dermatologist',
    experience: '10 سنوات',
    university: 'جامعة قناة السويس'
  }
];

const ADMIN_PASSWORD = 'cira2026';
const STORAGE_KEY = 'cira:q3:responses';

// ====== ZAPIER WEBHOOK ======
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/25586183/43r9bnx/';

// ====== CIRA LOGO ======
function CiraLogo({ size = 48 }) {
  return (
    <div style={{ color: BRAND.blueLight, lineHeight: 1, textAlign: 'center', display: 'inline-block' }}>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', 'Times New Roman', Georgia, serif",
          fontSize: size,
          fontWeight: 600,
          letterSpacing: '0.18em',
          lineHeight: 1,
          paddingRight: '0.18em',
          whiteSpace: 'nowrap',
          color: 'white'
        }}
      >
        CIRA
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', 'Times New Roman', Georgia, serif",
          fontSize: Math.max(8, size * 0.22),
          letterSpacing: '0.5em',
          marginTop: size * 0.2,
          opacity: 0.9,
          paddingRight: '0.5em',
          whiteSpace: 'nowrap',
          color: BRAND.silverLight
        }}
      >
        CLINIC
      </div>
    </div>
  );
}

// ====== MULTI-SELECT DROPDOWN ======
function MultiSelectDropdown({ groups, selected, onChange, placeholder }) {
  const [open, setOpen] = useState(false);

  const toggle = (item) => {
    if (selected.includes(item)) onChange(selected.filter(i => i !== item));
    else onChange([...selected, item]);
  };

  const removeItem = (item) => onChange(selected.filter(i => i !== item));

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full min-h-[56px] p-3 rounded-xl border-2 text-right flex items-start justify-between gap-2 transition-all"
        style={{ borderColor: BRAND.border, background: 'white' }}
      >
        <div className="flex flex-wrap gap-2 flex-1 justify-end">
          {selected.length === 0 ? (
            <span style={{ color: BRAND.textLight }} className="text-sm py-2">{placeholder}</span>
          ) : (
            selected.map(item => (
              <span
                key={item}
                className="px-3 py-1 rounded-full text-xs flex items-center gap-1.5"
                style={{ background: BRAND.blueLight, color: BRAND.navy }}
                onClick={(e) => { e.stopPropagation(); removeItem(item); }}
              >
                <X size={12} />
                {item}
              </span>
            ))
          )}
        </div>
        <ChevronLeft
          size={20}
          style={{ color: BRAND.navy, transform: open ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute top-full mt-2 w-full rounded-xl shadow-xl z-20 max-h-96 overflow-y-auto"
            style={{ background: 'white', border: `2px solid ${BRAND.border}` }}
          >
            {Object.entries(groups).map(([groupName, items]) => (
              <div key={groupName}>
                <div
                  className="px-4 py-2 text-xs font-bold sticky top-0"
                  style={{ background: BRAND.blueLighter, color: BRAND.navy }}
                >
                  {groupName}
                </div>
                {items.map(item => {
                  const isSelected = selected.includes(item);
                  return (
                    <div
                      key={item}
                      onClick={() => toggle(item)}
                      className="px-4 py-2.5 cursor-pointer flex items-center justify-between gap-2 transition-colors"
                      style={{
                        background: isSelected ? BRAND.blueLight : 'white',
                        color: BRAND.text
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: isSelected ? BRAND.navy : BRAND.border,
                          background: isSelected ? BRAND.navy : 'white'
                        }}
                      >
                        {isSelected && <Check size={14} color="white" />}
                      </div>
                      <span className="text-sm flex-1 text-right">{item}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ====== DOCTOR CARD ======
function DoctorCard({ doctor, onClick }) {
  const [hover, setHover] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Status check removed — managed via Google Sheets
    setStatus(null);
  }, [doctor.id]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-right p-4 rounded-xl transition-all border-2"
      style={{
        background: hover ? BRAND.navy : 'white',
        color: hover ? 'white' : BRAND.text,
        borderColor: hover ? BRAND.navy : BRAND.border,
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? `0 8px 20px ${BRAND.navy}33` : '0 2px 4px rgba(0,0,0,0.04)'
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="font-bold text-base mb-1">{doctor.name}</div>
          <div className="text-xs mb-1" style={{ color: hover ? BRAND.blueLight : BRAND.textLight }}>
            {doctor.title}
          </div>
          <div className="text-[11px]" style={{ color: hover ? BRAND.silverLight : BRAND.silver }}>
            خبرة {doctor.experience} · {doctor.university}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          {status === 'done' && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: hover ? BRAND.blueLight : '#D4F4DD',
                color: hover ? BRAND.navyDark : '#1A6B2E'
              }}
            >
              ✓ مكتمل
            </span>
          )}
          <ChevronLeft size={20} style={{ color: hover ? BRAND.blueLight : BRAND.navy }} />
        </div>
      </div>
    </button>
  );
}

// ====== LANDING PAGE ======
function LandingPage({ onSelectDoctor, onAdminClick }) {
  return (
    <div className="min-h-screen" style={{ background: BRAND.cream }} dir="rtl">
      <div style={{ background: BRAND.navy }} className="py-6 sm:py-8 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={onAdminClick}
            className="text-xs opacity-50 hover:opacity-100 transition-opacity flex items-center gap-1 flex-shrink-0"
            style={{ color: BRAND.blueLight }}
          >
            <Lock size={12} /> أدمن
          </button>
          <div className="scale-75 sm:scale-100 origin-right">
            <CiraLogo />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 text-center">
        <div
          className="inline-block px-4 py-1 rounded-full text-xs mb-4"
          style={{ background: BRAND.blueLight, color: BRAND.navy }}
        >
          خطة Q3 الصيفية · يوليو · أغسطس · سبتمبر
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: BRAND.navy }}>
          استبيان خبيرات سيرا
        </h1>
        <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: BRAND.textLight }}>
          نود معرفة الإجراءات والأجهزة المناسبة لموسم الصيف من وجهة نظرك
          <br />
          عشان نبني خطة Q3 التسويقية بناءً على خبرتك
        </p>
        <p className="text-sm mt-4" style={{ color: BRAND.navy, fontWeight: 600 }}>
          من فضلك اختاري اسمك من القائمة 👇
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: BRAND.navy }}
          >
            <Sparkles size={18} color={BRAND.blueLight} />
          </div>
          <h2 className="text-lg font-bold" style={{ color: BRAND.navy }}>طب الجلدية والتجميل والليزر</h2>
          <div className="flex-1 h-px" style={{ background: BRAND.border }} />
          <span className="text-xs" style={{ color: BRAND.textLight }}>{DOCTORS.length} خبيرات</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DOCTORS.map(doc => (
            <DoctorCard key={doc.id} doctor={doc} onClick={() => onSelectDoctor(doc)} />
          ))}
        </div>
      </div>

      <div className="text-center pb-8 text-xs" style={{ color: BRAND.textLight }}>
        © 2026 Cira Cosmetic Clinic · Internal Survey
      </div>
    </div>
  );
}

// ====== SURVEY PAGE ======
function SurveyPage({ doctor, onBack, onSubmit }) {
  const [selectedProcedures, setSelectedProcedures] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [customProcedures, setCustomProcedures] = useState([]);
  const [newCustom, setNewCustom] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Pre-fill removed — storage not available on Vercel
  }, [doctor.id]);

  const addCustom = () => {
    const trimmed = newCustom.trim();
    if (trimmed && !customProcedures.includes(trimmed)) {
      setCustomProcedures([...customProcedures, trimmed]);
      setNewCustom('');
    }
  };

  const handleSubmit = async () => {
    setError('');
    if (selectedProcedures.length === 0 && customProcedures.length === 0) {
      setError('من فضلك اختاري إجراء واحد على الأقل');
      return;
    }
    if (selectedDevices.length === 0) {
      setError('من فضلك اختاري جهاز واحد على الأقل');
      return;
    }

    setSubmitting(true);
    const submittedAt = new Date().toISOString();

    const payload = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorNameEn: doctor.nameEn,
      doctorTitle: doctor.title,
      procedures: selectedProcedures,
      customProcedures,
      devices: selectedDevices,
      notes,
      submittedAt
    };

    // ── 1. Send to Zapier → Google Sheets ───────────────────────────────────
    const zapierPayload = {
      submitted_at:      submittedAt,
      doctor_id:         doctor.id,
      doctor_name:       doctor.name,
      doctor_name_en:    doctor.nameEn,
      doctor_title:      doctor.title,
      procedures:        selectedProcedures.join(' | '),
      custom_procedures: customProcedures.join(' | '),
      devices:           selectedDevices.join(' | '),
      notes:             notes || '',
      procedures_count:  selectedProcedures.length + customProcedures.length,
      devices_count:     selectedDevices.length,
    };

    try {
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(zapierPayload),
      });
    } catch (e) {
      console.error('Zapier webhook error:', e);
    }

    setTimeout(() => {
      setSubmitting(false);
      onSubmit(payload);
    }, 700);
  };

  return (
    <div className="min-h-screen" style={{ background: BRAND.cream }} dir="rtl">
      <div style={{ background: BRAND.navy }} className="py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
            style={{ color: BRAND.blueLight }}
          >
            رجوع
            <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <CiraLogo size={36} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-2">
        <div
          className="rounded-2xl p-6 shadow-lg flex items-center gap-4"
          style={{ background: 'white', border: `2px solid ${BRAND.blueLight}` }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: BRAND.blueLight }}
          >
            <Stethoscope size={24} color={BRAND.navy} />
          </div>
          <div className="flex-1">
            <div className="text-xl font-bold" style={{ color: BRAND.navy }}>{doctor.name}</div>
            <div className="text-sm" style={{ color: BRAND.textLight }}>{doctor.title}</div>
            <div className="text-xs mt-1" style={{ color: BRAND.silver }}>
              خبرة {doctor.experience} · {doctor.university}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        <div
          className="p-5 rounded-xl text-sm leading-relaxed"
          style={{ background: BRAND.blueLight, color: BRAND.navyDark }}
        >
          <strong>الهدف من الاستبيان:</strong> نبني خطة Q3 التسويقية (يوليو · أغسطس · سبتمبر) بناءً على خبرتك.
          من فضلك اختاري الإجراءات والأجهزة اللي ترى إنها مناسبة لموسم الصيف.
        </div>

        <div>
          <label className="block mb-3">
            <span className="text-base font-bold block" style={{ color: BRAND.navy }}>
              ١. الإجراءات المناسبة لموسم الصيف
            </span>
            <span className="text-xs" style={{ color: BRAND.textLight }}>
              اختاري كل الإجراءات اللي تنصحي بالتركيز عليها · يمكن اختيار أكثر من واحد
            </span>
          </label>
          <MultiSelectDropdown
            groups={PROCEDURES}
            selected={selectedProcedures}
            onChange={setSelectedProcedures}
            placeholder="اضغطي لاختيار الإجراءات..."
          />
        </div>

        <div>
          <label className="block mb-3">
            <span className="text-base font-bold block" style={{ color: BRAND.navy }}>
              ٢. إضافة إجراءات غير موجودة في القائمة
            </span>
            <span className="text-xs" style={{ color: BRAND.textLight }}>
              لو في إجراء عاوزة تضيفيه ومش موجود فوق · اختياري
            </span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCustom}
              onChange={(e) => setNewCustom(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom())}
              placeholder="اكتبي اسم الإجراء واضغطي +"
              className="flex-1 px-4 py-3 rounded-xl border-2 text-right outline-none transition-all"
              style={{ borderColor: BRAND.border, background: 'white', color: BRAND.text, fontSize: '16px' }}
              onFocus={(e) => e.target.style.borderColor = BRAND.navy}
              onBlur={(e) => e.target.style.borderColor = BRAND.border}
            />
            <button
              type="button"
              onClick={addCustom}
              className="px-5 rounded-xl flex items-center gap-1 text-sm font-bold transition-all hover:opacity-90"
              style={{ background: BRAND.navy, color: 'white' }}
            >
              <Plus size={16} />
              إضافة
            </button>
          </div>
          {customProcedures.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {customProcedures.map(item => (
                <span
                  key={item}
                  onClick={() => setCustomProcedures(customProcedures.filter(i => i !== item))}
                  className="px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 cursor-pointer"
                  style={{ background: BRAND.silver, color: 'white' }}
                >
                  <X size={12} />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-3">
            <span className="text-base font-bold block" style={{ color: BRAND.navy }}>
              ٣. الأجهزة المناسبة لموسم الصيف
            </span>
            <span className="text-xs" style={{ color: BRAND.textLight }}>
              اختاري الأجهزة اللي ترى إنها أنسب لجلسات الصيف · يمكن اختيار أكثر من واحد
            </span>
          </label>
          <MultiSelectDropdown
            groups={DEVICES}
            selected={selectedDevices}
            onChange={setSelectedDevices}
            placeholder="اضغطي لاختيار الأجهزة..."
          />
        </div>

        <div>
          <label className="block mb-3">
            <span className="text-base font-bold block" style={{ color: BRAND.navy }}>
              ٤. ملاحظات إضافية (اختياري)
            </span>
            <span className="text-xs" style={{ color: BRAND.textLight }}>
              أي توصيات أو نقاط تركيز إضافية تحبي نأخدها في الحسبان
            </span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="مثال: التركيز على باقات تجديد البشرة قبل السفر، عروض للمناطق المعرضة للشمس، ..."
            className="w-full px-4 py-3 rounded-xl border-2 text-right outline-none transition-all resize-none"
            style={{ borderColor: BRAND.border, background: 'white', color: BRAND.text, fontSize: '16px' }}
            onFocus={(e) => e.target.style.borderColor = BRAND.navy}
            onBlur={(e) => e.target.style.borderColor = BRAND.border}
          />
        </div>

        {error && (
          <div
            className="p-4 rounded-xl text-sm flex items-center gap-2"
            style={{ background: '#FEE', color: '#B91C1C', border: '1px solid #FCA5A5' }}
          >
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-4 rounded-xl text-base font-bold transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          style={{ background: BRAND.navy, color: 'white' }}
        >
          {submitting ? 'جاري الحفظ...' : (
            <>
              <Check size={20} />
              إرسال الاستبيان
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ====== SUCCESS PAGE ======
function SuccessPage({ doctor, onBackToList }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: BRAND.cream }} dir="rtl">
      <div className="max-w-md w-full text-center">
        <div
          className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background: BRAND.navy }}
        >
          <Check size={48} color={BRAND.blueLight} />
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: BRAND.navy }}>
          شكراً لكي يا {doctor.name}! 💙
        </h2>
        <p className="text-base mb-8 leading-relaxed" style={{ color: BRAND.textLight }}>
          تم استلام ردك بنجاح. مساهمتك ستساعدنا في بناء خطة Q3 التسويقية بشكل أفضل وأدق.
        </p>
        <button
          onClick={onBackToList}
          className="px-8 py-3 rounded-xl font-bold transition-all hover:opacity-90"
          style={{ background: BRAND.navy, color: 'white' }}
        >
          العودة للقائمة
        </button>
      </div>
    </div>
  );
}

// ====== ADMIN LOGIN ======
function AdminLogin({ onSuccess, onBack }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) onSuccess();
    else setError('كلمة السر غير صحيحة');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: BRAND.cream }} dir="rtl">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div style={{ background: BRAND.navy }} className="inline-block p-4 rounded-2xl mb-4">
            <CiraLogo size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: BRAND.navy }}>لوحة الأدمن</h2>
          <p className="text-sm" style={{ color: BRAND.textLight }}>أدخل كلمة السر للدخول</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4" style={{ border: `2px solid ${BRAND.border}` }}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="كلمة السر"
            className="w-full px-4 py-3 rounded-xl border-2 text-center outline-none transition-all"
            style={{ borderColor: error ? '#FCA5A5' : BRAND.border, background: BRAND.cream, color: BRAND.text, fontSize: '16px' }}
            autoFocus
          />
          {error && (
            <div className="text-sm text-center" style={{ color: '#B91C1C' }}>{error}</div>
          )}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl font-bold transition-all hover:opacity-90"
            style={{ background: BRAND.navy, color: 'white' }}
          >
            دخول
          </button>
          <button
            onClick={onBack}
            className="w-full py-2 text-sm transition-all hover:opacity-80"
            style={{ color: BRAND.textLight }}
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
}

// ====== STAT CARD ======
function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-2xl p-4" style={{ border: `2px solid ${BRAND.border}` }}>
      <div className="flex items-center justify-between mb-2">
        <Icon size={20} style={{ color }} />
      </div>
      <div className="text-2xl font-bold" style={{ color: BRAND.navy }}>{value}</div>
      <div className="text-xs mt-1" style={{ color: BRAND.textLight }}>{label}</div>
    </div>
  );
}

// ====== DETAIL SECTION ======
function DetailSection({ title, items, highlight }) {
  return (
    <div>
      <h4 className="font-bold mb-2 text-sm" style={{ color: BRAND.navy }}>
        {title} <span className="text-xs font-normal" style={{ color: BRAND.textLight }}>({items.length})</span>
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span
            key={item}
            className="px-3 py-1.5 rounded-full text-xs"
            style={{
              background: highlight ? BRAND.silver : BRAND.blueLight,
              color: highlight ? 'white' : BRAND.navy
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ====== GOOGLE SHEETS CONFIG ======
const SHEET_ID = '1ThmNKL6QGF7wGqXebGSjcbkbd9pkrlzCLfllw5rYuPc';
const SHEET_NAME = 'Sheet1';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

function parseSheetResponse(raw: string) {
  const json = raw.replace(/^[^(]+\(/, '').replace(/\);?$/, '');
  const data = JSON.parse(json);
  const rows = data.table.rows;
  return rows.map((row: any) => {
    const c = row.c;
    const get = (i: number) => (c[i] && c[i].v != null ? String(c[i].v) : '');
    const getArr = (i: number) => get(i).split(' | ').filter(Boolean);
    return {
      submittedAt:      get(0),
      doctorId:         get(1),
      doctorName:       get(2),
      doctorTitle:      get(3),
      specialty:        get(4),
      procedures:       getArr(5),
      customProcedures: getArr(6),
      devices:          getArr(7),
      notes:            get(8),
    };
  });
}

// ====== ADMIN DASHBOARD ======
function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<any>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchFromSheet = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(SHEET_URL);
      const text = await res.text();
      const parsed = parseSheetResponse(text);
      setResponses(parsed);
      setLastRefresh(new Date());
    } catch (e) {
      setError('تعذّر تحميل البيانات. تأكد من أن الجدول مشارك للعموم.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFromSheet(); }, []);

  const exportCSV = () => {
    const headers = ['تاريخ الإرسال', 'اسم الدكتورة', 'المسمى الوظيفي', 'الإجراءات', 'إجراءات مضافة', 'الأجهزة', 'ملاحظات'];
    const rows = responses.map(r => [
      r.submittedAt,
      r.doctorName,
      r.doctorTitle,
      r.procedures.join(' | '),
      r.customProcedures.join(' | '),
      r.devices.join(' | '),
      (r.notes || '').replace(/\n/g, ' '),
    ]);
    const csv = [headers, ...rows]
      .map(row => row.map((cell: string) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cira-q3-survey-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const performDelete = (doctorId: string) => {
    setResponses(prev => prev.filter(r => r.doctorId !== doctorId));
    if (selectedDoctor?.doctorId === doctorId) setSelectedDoctor(null);
    setConfirmDelete(null);
  };

  const completedCount = responses.length;
  const totalCount = DOCTORS.length;
  const pendingDoctors = DOCTORS.filter(d => !responses.find(r => r.doctorId === d.id));

  return (
    <div className="min-h-screen" style={{ background: BRAND.cream }} dir="rtl">
      <div style={{ background: BRAND.navy }} className="py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-80"
              style={{ background: BRAND.navyDark, color: BRAND.blueLight }}
            >
              خروج
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchFromSheet}
                className="px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-80"
                style={{ background: BRAND.navyDark, color: BRAND.blueLight }}
              >
                ↻ تحديث
              </button>
              <button
                onClick={exportCSV}
                disabled={responses.length === 0}
                className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: BRAND.blueLight, color: BRAND.navyDark, fontWeight: 600 }}
              >
                <Download size={14} />
                تحميل CSV
              </button>
            </div>
          </div>
          <CiraLogo size={36} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: BRAND.navy }}>لوحة استبيان Q3 - سيرا</h1>
        <p className="text-sm mb-1" style={{ color: BRAND.textLight }}>
          مراجعة ردود الخبيرات على استبيان الخطة الصيفية
        </p>
        <p className="text-xs mb-6" style={{ color: BRAND.textLight }}>
          آخر تحديث: {lastRefresh.toLocaleTimeString('ar-SA')} · البيانات من Google Sheets
        </p>
        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm text-center" style={{ background: '#FEE2E2', color: '#B91C1C' }}>
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="عدد الردود" value={completedCount} icon={Check} color={BRAND.navy} />
          <StatCard label="إجمالي الخبيرات" value={totalCount} icon={Stethoscope} color={BRAND.silver} />
          <StatCard label="نسبة الإكمال" value={`${Math.round(completedCount / totalCount * 100)}%`} icon={Sparkles} color={BRAND.blue} />
          <StatCard label="بانتظار الرد" value={totalCount - completedCount} icon={AlertCircle} color={BRAND.textLight} />
        </div>

        {loading ? (
          <div className="text-center py-12" style={{ color: BRAND.textLight }}>جاري التحميل...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: BRAND.navy }}>
                <Check size={18} />
                الردود المستلمة ({completedCount})
              </h3>
              <div className="space-y-2">
                {responses.length === 0 ? (
                  <div
                    className="p-8 rounded-xl text-center text-sm"
                    style={{ background: 'white', color: BRAND.textLight, border: `2px dashed ${BRAND.border}` }}
                  >
                    لم يتم استلام أي ردود بعد
                  </div>
                ) : (
                  responses.map(r => (
                    <div
                      key={r.doctorId}
                      className="p-4 rounded-xl bg-white border-2 hover:shadow-md transition-all"
                      style={{ borderColor: BRAND.border }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => setSelectedDoctor(r)}
                        >
                          <div className="font-bold text-sm" style={{ color: BRAND.navy }}>{r.doctorName}</div>
                          <div className="text-xs mt-1" style={{ color: BRAND.textLight }}>
                            {r.procedures.length + r.customProcedures.length} إجراء · {r.devices.length} جهاز
                          </div>
                          <div className="text-[10px] mt-1" style={{ color: BRAND.textLight }}>
                            {new Date(r.submittedAt).toLocaleString('ar-SA')}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5 items-center">
                          <button
                            onClick={() => setSelectedDoctor(r)}
                            className="p-1.5 rounded-lg transition-all hover:opacity-80"
                            style={{ background: BRAND.blueLight, color: BRAND.navy }}
                            title="عرض التفاصيل"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setConfirmDelete(r); }}
                            className="p-1.5 rounded-lg transition-all hover:opacity-80"
                            style={{ background: '#FEE', color: '#B91C1C' }}
                            title="حذف الرد"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: BRAND.textLight }}>
                <AlertCircle size={18} />
                بانتظار الرد ({pendingDoctors.length})
              </h3>
              <div className="space-y-2">
                {pendingDoctors.length === 0 ? (
                  <div
                    className="p-8 rounded-xl text-center text-sm"
                    style={{ background: BRAND.blueLight, color: BRAND.navyDark }}
                  >
                    🎉 كل الخبيرات أرسلن ردودهن!
                  </div>
                ) : (
                  pendingDoctors.map(d => (
                    <div
                      key={d.id}
                      className="p-4 rounded-xl border-2"
                      style={{ background: BRAND.cream, borderColor: BRAND.border, borderStyle: 'dashed' }}
                    >
                      <div className="font-bold text-sm" style={{ color: BRAND.text }}>{d.name}</div>
                      <div className="text-xs mt-1" style={{ color: BRAND.textLight }}>{d.title}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {selectedDoctor && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setSelectedDoctor(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 p-6 flex items-start justify-between" style={{ background: BRAND.navy, color: 'white' }}>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: BRAND.blueLight }}>{selectedDoctor.doctorName}</h3>
                  <div className="text-xs mt-1 opacity-80">{selectedDoctor.doctorTitle}</div>
                </div>
                <button onClick={() => setSelectedDoctor(null)} style={{ color: BRAND.blueLight }}>
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <DetailSection title="الإجراءات المختارة" items={selectedDoctor.procedures} />
                {selectedDoctor.customProcedures?.length > 0 && (
                  <DetailSection title="إجراءات مضافة" items={selectedDoctor.customProcedures} highlight />
                )}
                <DetailSection title="الأجهزة المختارة" items={selectedDoctor.devices} />
                {selectedDoctor.notes && (
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: BRAND.navy }}>ملاحظات</h4>
                    <div
                      className="p-3 rounded-lg text-sm leading-relaxed"
                      style={{ background: BRAND.cream, color: BRAND.text }}
                    >
                      {selectedDoctor.notes}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setConfirmDelete(selectedDoctor)}
                  className="w-full py-2 rounded-lg text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ background: '#FEE', color: '#B91C1C', border: '1px solid #FCA5A5' }}
                >
                  <Trash2 size={14} />
                  حذف هذا الرد
                </button>
              </div>
            </div>
          </div>
        )}

        {confirmDelete && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={() => setConfirmDelete(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#FEE' }}>
                  <AlertCircle size={24} style={{ color: '#B91C1C' }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: BRAND.navy }}>تأكيد الحذف</h3>
                  <p className="text-xs" style={{ color: BRAND.textLight }}>هذا الإجراء لا يمكن التراجع عنه</p>
                </div>
              </div>

              <p className="text-sm mb-6 leading-relaxed" style={{ color: BRAND.text }}>
                هل أنت متأكد من حذف رد <strong>{confirmDelete.doctorName}</strong>؟
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all hover:opacity-80"
                  style={{ background: BRAND.cream, color: BRAND.text, border: `1px solid ${BRAND.border}` }}
                >
                  إلغاء
                </button>
                <button
                  onClick={() => performDelete(confirmDelete.doctorId)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: '#B91C1C', color: 'white' }}
                >
                  نعم، احذف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ====== MAIN APP ======
export default function App() {
  const [view, setView] = useState('landing');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Cormorant+Garamond:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.body.style.fontFamily = "'Tajawal', sans-serif";
    return () => { document.head.removeChild(link); };
  }, []);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setView('survey');
  };

  const handleSubmit = (payload) => {
    setView('success');
  };

  return (
    <div style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {view === 'landing' && (
        <LandingPage
          onSelectDoctor={handleSelectDoctor}
          onAdminClick={() => setView('admin-login')}
        />
      )}
      {view === 'survey' && selectedDoctor && (
        <SurveyPage
          doctor={selectedDoctor}
          onBack={() => setView('landing')}
          onSubmit={handleSubmit}
        />
      )}
      {view === 'success' && selectedDoctor && (
        <SuccessPage
          doctor={selectedDoctor}
          onBackToList={() => { setSelectedDoctor(null); setView('landing'); }}
        />
      )}
      {view === 'admin-login' && (
        <AdminLogin
          onSuccess={() => setView('admin')}
          onBack={() => setView('landing')}
        />
      )}
      {view === 'admin' && (
        <AdminDashboard onBack={() => setView('landing')} />
      )}
    </div>
  );
}
