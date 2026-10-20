

const questionsList = document.getElementById("questions-list");
const addQuestionBtn = document.getElementById("add-question-btn");
const formSection = document.getElementById("question-form-section");
const questionForm = document.getElementById("question-form");
const formTitle = document.getElementById("form-title");
const questionInput = document.getElementById("question-input");
const cancelBtn = document.getElementById("cancel-btn");

const optionInputs = [
  document.getElementById("option1"),
  document.getElementById("option2"),
  document.getElementById("option3"),
  document.getElementById("option4")
];


const tagInputs = [
  document.getElementById("tag1"),
  document.getElementById("tag2"),
  document.getElementById("tag3"),
  document.getElementById("tag4")
];

const tagNames = {
  textile: "النسيج والخيوط",
  wood: "الأخشاب",
  metal: "المعادن",
  clay: "الطين والفخار",
  natural: "المواد الطبيعية",
  art: "الإبداع الفني",
  precision: "الدقة والإتقان",
  practical: "الاستخدام العملي",
  decoration: "الزخرفة",
  craft: "التشكيل والعمل اليدوي"
};

tagInputs.forEach(select => {
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "اختاري تصنيف الخيار";
  select.appendChild(placeholder);

  Object.entries(tagNames).forEach(([tag, name]) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = name;
    select.appendChild(option);
  });
});


const defaultQuestions = [
  {
    question: "إذا أُتيحت لك فرصة تعلّم حرفة تقليدية، فأيّ الأنشطة التالية تفضّل ممارستها؟",
    options: [
      "نسج الأقمشة وتنسيق الخيوط والألوان لإنتاج قطع فنية.",
      "تشكيل المواد الخام وتحويلها إلى منتجات يدوية.",
      "تصميم الزخارف وإضافة التفاصيل الفنية الدقيقة.",
      "صناعة أدوات عملية تُستخدم في الحياة اليومية."
    ]
  },
  {
    question: "أيّ المواد التالية تفضّل استخدامها في صناعة منتج يدوي؟",
    options: [
      "الأقمشة والخيوط والألياف الطبيعية.",
      "الطين والأحجار والمعادن.",
      "الأخشاب والجلود والمواد الصلبة.",
      "النباتات والزهور والزيوت العطرية."
    ]
  },
  {
    question: "ما طبيعة العمل التي تجد فيها أكبر قدر من المتعة والإنجاز؟",
    options: [
      "الأعمال التي تتطلب الدقة والصبر والاهتمام بالتفاصيل.",
      "الأعمال التي تتيح الإبداع والتعبير الفني.",
      "الأعمال التي تعتمد على المهارات العملية والتشكيل اليدوي.",
      "الأعمال التي تتضمن معالجة المواد الطبيعية وتحويلها إلى منتجات."
    ]
  },
  {
    question: "إذا أُتيحت لك فرصة صناعة منتج تراثي، فأيّ المنتجات التالية تفضّل إنجازها؟",
    options: [
      "قطعة فنية أو زخرفية تُستخدم للزينة.",
      "قطعة من الملابس أو المنسوجات التقليدية.",
      "أداة عملية تُستخدم في المنزل أو الحياة اليومية.",
      "منتج طبيعي يرتبط بالعطور أو العناية الشخصية."
    ]
  },
  {
    question: "ما الجانب الذي يجذبك أكثر عند تعلّم حرفة تراثية جديدة؟",
    options: [
      "اكتشاف الأساليب الفنية والزخارف التي تعبّر عن الهوية الثقافية.",
      "إتقان المهارات الدقيقة وإنتاج قطع تتميز بالجودة والإتقان.",
      "تعلّم طرق صناعة الأدوات التقليدية وفهم استخداماتها العملية.",
      "التعرّف على كيفية الاستفادة من الموارد الطبيعية في صناعة المنتجات التراثية."
    ]
  }
];


const defaultTags = [
  ["textile", "craft", "decoration", "practical"],
  ["textile", "clay", "wood", "natural"],
  ["precision", "art", "craft", "natural"],
  ["decoration", "textile", "practical", "natural"],
  ["art", "precision", "practical", "natural"]
];

defaultQuestions.forEach((question, index) => {
  question.tags = [...defaultTags[index]];
});


let adminQuestions;

try {
  const saved = JSON.parse(localStorage.getItem("adminQuizQuestions"));
  adminQuestions = Array.isArray(saved) ? saved : structuredClone(defaultQuestions);
} catch (error) {
  adminQuestions = structuredClone(defaultQuestions);
}

adminQuestions.forEach((question, index) => {
  if (!Array.isArray(question.tags)) {
    question.tags = defaultTags[index]
      ? [...defaultTags[index]]
      : ["", "", "", ""];
  }
});

saveQuestions();

let editingIndex = null;

/* Save Questions */

function saveQuestions() {
  localStorage.setItem(
    "adminQuizQuestions",
    JSON.stringify(adminQuestions)
  );
}

/* Display Questions */

function displayQuestions() {

  questionsList.innerHTML = "";

  if (adminQuestions.length === 0) {
    questionsList.textContent = "لا توجد أسئلة حاليًا.";
    return;
  }

  adminQuestions.forEach((item, index) => {

    const card = document.createElement("div");
    card.className = "admin-question";

    const title = document.createElement("h3");
    title.textContent = `السؤال ${index + 1}: ${item.question}`;

    const optionsList = document.createElement("ul");

    item.options.forEach(option => {
      const li = document.createElement("li");
      li.textContent = option;
      optionsList.appendChild(li);
    });

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "edit-btn";
    editBtn.textContent = "تعديل";

    editBtn.addEventListener("click", function() {
      editQuestion(index);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "حذف";

    deleteBtn.addEventListener("click", function() {
      deleteQuestion(index);
    });

    card.appendChild(title);
    card.appendChild(optionsList);
    card.appendChild(editBtn);
    card.appendChild(deleteBtn);

    questionsList.appendChild(card);

  });
}

/* Add Question */

addQuestionBtn.addEventListener("click", function() {

  editingIndex = null;
  questionForm.reset();

  formTitle.textContent = "إضافة سؤال جديد";
  formSection.hidden = false;

  formSection.scrollIntoView({ behavior: "smooth" });

});

/* Edit Question */

function editQuestion(index) {

  editingIndex = index;

  const item = adminQuestions[index];

  questionInput.value = item.question;

  optionInputs.forEach((input, i) => {
    input.value = item.options[i];
  });

tagInputs.forEach((select, i) => {
  select.value = item.tags?.[i] || defaultTags[index]?.[i] || "";
});

  formTitle.textContent = "تعديل السؤال";
  formSection.hidden = false;

  formSection.scrollIntoView({ behavior: "smooth" });
}

/* Delete Question */

function deleteQuestion(index) {

  const confirmed = confirm("هل أنت متأكد من حذف هذا السؤال؟");

  if (!confirmed) return;

  adminQuestions.splice(index, 1);

  editingIndex = null;
  formSection.hidden = true;

  saveQuestions();
  displayQuestions();
}

/* Save Add / Edit */

questionForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const newQuestion = {
  question: questionInput.value.trim(),
  options: optionInputs.map(input => input.value.trim()),
  tags: tagInputs.map(select => select.value)
};

  if (
  !newQuestion.question ||
  newQuestion.options.some(option => !option) ||
  newQuestion.tags.some(tag => !tag)
) {
  alert("يرجى تعبئة السؤال والخيارات وتصنيفاتها.");
  return;
}

  if (editingIndex === null) {
    adminQuestions.push(newQuestion);
  } else {
    adminQuestions[editingIndex] = newQuestion;
  }

  saveQuestions();
  displayQuestions();

  questionForm.reset();
  formSection.hidden = true;
  editingIndex = null;

});

/* Cancel */

cancelBtn.addEventListener("click", function() {

  questionForm.reset();
  formSection.hidden = true;
  editingIndex = null;

});

/* Initial Display */

displayQuestions();