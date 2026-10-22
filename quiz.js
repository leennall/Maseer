const welcomeScreen = document.getElementById("welcome-screen");
const questionScreen = document.getElementById("question-screen");
const startBtn = document.getElementById("start-btn");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

const progressFill= document.getElementById("progress-fill");

const resultScreen = document.getElementById("result-screen");
const resultCrafts = document.getElementById("result-crafts");
const restartBtn = document.getElementById("restart-btn");

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


let questions;

try {
  const savedQuestions = JSON.parse(
    localStorage.getItem("adminQuizQuestions")
  );

  questions = Array.isArray(savedQuestions)
    ? savedQuestions
    : defaultQuestions;

} catch (error) {
  questions = defaultQuestions;
}

questions.forEach((question, index) => {
  if (!Array.isArray(question.tags)) {
    question.tags = defaultTags[index]
      ? [...defaultTags[index]]
      : ["", "", "", ""];
  }
});

/* Update Quiz Questions Count */

const quizCountText = document.getElementById("quiz-count-text");
const quizCountInfo = document.getElementById("quiz-count-info");

const count = questions.length;

let countLabel;

if (count === 1) {
  countLabel = "سؤال واحد";
} else if (count === 2) {
  countLabel = "سؤالين";
} else if (count >= 3 && count <= 10) {
  countLabel = count + " أسئلة";
} else {
  countLabel = count + " سؤالًا";
}

quizCountText.textContent = countLabel;
quizCountInfo.textContent = countLabel;
const crafts = [
  {
	id: "sadu",
    name: "السدو",
    region: "الحدود الشمالية / الجوف",
    image: "img/sadu.jpg",
    tags: ["textile", "natural", "precision", "art"]
  },
  {
	id: "hail",
    name: "صناعة الدلال",
    region: "حائل",
    image: "img/hail.jpg",
    tags: ["metal", "practical", "precision", "craft"]
  },
  {
	id: "madina",
    name: "صناعة الخوص",
    region: "المدينة المنورة / الغربية",
    image: "img/madina.jpg",
    tags: ["textile", "natural", "practical", "craft"]
  },
  {
	id: "alahssa",
    name: "صناعة الزري",
    region: "المنطقة الشرقية (الأحساء)",
    image: "img/alahssa.jpg",
    tags: ["textile", "precision", "art", "decoration"]
  },
  {
	id: "najd",
    name: "الأبواب النجدية",
    region: "الرياض / نجد",
    image: "img/najd.jpg",
    tags: ["wood", "practical", "art", "decoration"]
  },
  {
	id: "najran",
    name: "صناعة الخناجر",
    region: "نجران",
    image: "img/najran.jpg",
    tags: ["metal", "precision", "craft", "decoration"]
  },
  {
	id: "jazan",
    name: "صناعة الفخار",
    region: "جازان",
    image: "img/jazan.jpg",
    tags: ["clay", "practical", "craft", "art"]
  },
  {
	id: "aseer",
    name: "القط العسيري",
    region: "عسير",
    image: "img/aseer.jpg",
    tags: ["art", "decoration", "precision"]
  },
  {
	id: "wood",
    name: "المشغولات الخشبية",
    region: "مكة المكرمة / الحجاز",
    image: "img/wood.jpg",
    tags: ["wood", "practical", "craft", "art"]
  }
];



let currentQuestion = 0;

const answers = new Array(questions.length).fill(null);


function showQuestion() {

  const current = questions[currentQuestion];

  // Display question number
  questionNumber.textContent =
    `السؤال ${currentQuestion + 1} من ${questions.length}`;

  // Display question text
  questionText.textContent = current.question;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressFill.style.width = progress + "%";
  // Clear previous options
  answerOptions.innerHTML = "";

  // Create answer buttons
  current.options.forEach((option, index) => {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-option";
    button.textContent = option;

    // Highlight selected answer
    if (answers[currentQuestion] === index) {
      button.classList.add("selected");
    }

    // Save selected answer
    button.addEventListener("click", function() {

      answers[currentQuestion] = index;

      showQuestion();

    });

    answerOptions.appendChild(button);

  });

  // Disable previous button on first question
  prevBtn.disabled = currentQuestion === 0;

  // Disable next button until an answer is selected
  nextBtn.disabled = answers[currentQuestion] === null;

  // Change button text on last question
  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "عرض النتائج"
      : "التالي";

}


startBtn.addEventListener("click", function() {

  if (questions.length === 0) {
    alert("لا توجد أسئلة متاحة حاليًا.");
    return;
  }

  currentQuestion = 0;
  answers.fill(null);

  welcomeScreen.hidden = true;
  questionScreen.hidden = false;

  showQuestion();

});
nextBtn.addEventListener("click", function() {

  // Prevent moving without an answer
  if (answers[currentQuestion] === null) {
    return;
  }

  // Move to next question
  if (currentQuestion < questions.length - 1) {

    currentQuestion++;

    showQuestion();

  } else {
    showResults();
  }

});


prevBtn.addEventListener("click", function() {

  if (currentQuestion > 0) {

    currentQuestion--;

    showQuestion();

  }

});



function calculateResults() {

  const selectedTags = answers.map((answer, index) => {
    return questions[index].tags[answer];
  });

  const tagWeights = {
    textile: 3,
    wood: 3,
    metal: 3,
    clay: 3,
    natural: 2,
    art: 2,
    precision: 2,
    practical: 2,
    decoration: 2,
    craft: 2
  };

  const results = crafts.map(craft => {

    let score = 0;
    let matches = 0;

    selectedTags.forEach(tag => {

      if (craft.tags.includes(tag)) {
        score += tagWeights[tag] || 1;
        matches++;
      }

    });

    return {
      ...craft,
      score: score,
      matches: matches
    };

  });

  results.sort((a, b) => {

    if (b.score !== a.score) {
      return b.score - a.score;
    }

    if (b.matches !== a.matches) {
      return b.matches - a.matches;
    }

    return a.name.localeCompare(b.name, "ar");

  });

  return results.slice(0, 1);
}


function showResults() {

  const topCrafts = calculateResults();

  questionScreen.hidden = true;
  resultScreen.hidden = false;

  resultCrafts.innerHTML = "";

  topCrafts.forEach(craft => {

    const card = document.createElement("div");
    card.className = "result-card";

    const image = document.createElement("img");
    image.src = craft.image;
    image.alt = craft.name;

    const name = document.createElement("h3");
    name.textContent = craft.name;

    const region = document.createElement("p");
    region.className = "result-region";
    region.textContent = craft.region;


    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(region);
	
const craftBtn = document.createElement("a");

craftBtn.href = "craft.html?id=" + craft.id;
craftBtn.className = "craft-btn";
craftBtn.textContent = "اكتشف الحرفة";

card.appendChild(craftBtn);


    resultCrafts.appendChild(card);

  });

}

restartBtn.addEventListener("click", function() {

  currentQuestion = 0;
  answers.fill(null);

  resultScreen.hidden = true;
  welcomeScreen.hidden = false;

  resultCrafts.innerHTML = "";

});