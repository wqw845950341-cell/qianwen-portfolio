// LaneMuse: implemented front-end prototype; production integrations remain explicit.
export const citywalkProject = {
  "id": 6,
  "key": "lanemuse",
  "category": "AI",
  "short": "LaneMuse",
  "icon": "product",
  "color": "#91afe2",
  "tags": [
    "AI Product",
    "CityWalk",
    "Cultural UX"
  ],
  "title": {
    "en": "LaneMuse CityWalk",
    "zh": "巷遇 · AI CityWalk"
  },
  "headline": {
    "en": "Read the city, one walk at a time.",
    "zh": "把城市，走成自己的故事。"
  },
  "question": {
    "en": "How can a cultural walk fit a person's time, interests and energy?",
    "zh": "如何让文化漫步适合每个人的时间、兴趣与体力？"
  },
  "focus": {
    "en": "AI product design & cultural experience",
    "zh": "AI 产品设计与文化体验"
  },
  "status": {
    "en": "Interactive concept prototype",
    "zh": "可交互概念原型"
  },
  "scope": {
    "en": "Local rule-based AI and route simulations, illustrative maps and AI-generated photographic-style assets. No live LLM, verified walking navigation, real-time opening data or measured business impact.",
    "zh": "AI 与路线为本地规则演示，地图为示意，照片为 AI 生成实拍风格。未接入真实模型、路网导航与实时营业数据，不宣称商业成果。"
  },
  "role": {
    "en": "Product definition · PRD · Agent workflow · Interaction prototype",
    "zh": "产品定义 · PRD · Agent 工作流 · 交互原型"
  },
  "tools": "React · TypeScript · Agent workflow · Cultural content",
  "url": "https://wqw845950341-cell.github.io/qianwen-portfolio/citywalk/",
  "repo": "https://github.com/wqw845950341-cell/qianwen-portfolio/tree/main/citywalk",
  "context": {
    "en": "A mobile-first cultural walking assistant for independent visitors and urban explorers.",
    "zh": "面向自由行游客与城市探索者的移动端文化漫步助手。"
  },
  "approach": {
    "en": "Connect preference setting, numbered maps, source-backed cultural notes and confirmed itinerary changes.",
    "zh": "连接偏好设置、编号地图、有来源的文化讲解与用户确认后的行程调整。"
  },
  "delivery": [
    {
      "en": "PRD & feature traceability",
      "zh": "完整 PRD 与需求追踪"
    },
    {
      "en": "Mobile interaction prototype",
      "zh": "手机端交互原型"
    },
    {
      "en": "Visual system & case study",
      "zh": "视觉规范与作品集案例"
    },
    {
      "en": "Browser validation record",
      "zh": "浏览器验证记录"
    }
  ],
  "validation": {
    "en": "Build, mobile layout and main-flow browser checks completed. User research and field walking tests remain planned.",
    "zh": "已完成构建、手机布局与主流程浏览器检查；用户研究与实地试走仍待开展。"
  },
  "nextTest": {
    "en": "Test five users, verify a real walking route, then evaluate LLM/RAG and map integrations.",
    "zh": "开展五人任务测试与实地试走，再评估模型、知识库和地图接入。"
  },
  "steps": [
    {
      "label": {
        "en": "Preferences",
        "zh": "偏好设置"
      },
      "detail": {
        "en": "Capture destination, time, interests, budget and walking intensity; keep constraints explicit before planning.",
        "zh": "采集目的地、时长、兴趣、预算与步行强度，在规划前明确约束。"
      }
    },
    {
      "label": {
        "en": "Route",
        "zh": "路线地图"
      },
      "detail": {
        "en": "Use consistent stop IDs across map and list. Display distance, total time and expense estimates together.",
        "zh": "地图与列表共用站点编号，同时说明总时长、步行距离和费用估算。"
      }
    },
    {
      "label": {
        "en": "Culture",
        "zh": "文化讲解"
      },
      "detail": {
        "en": "Separate source-supported history from observation prompts, with text and browser speech playback.",
        "zh": "将有来源的史实与观察提示分开，提供文字阅读与浏览器语音播放。"
      }
    },
    {
      "label": {
        "en": "Adjust",
        "zh": "确认调整"
      },
      "detail": {
        "en": "Preview stop, distance and time changes before applying them; preserve completed stops.",
        "zh": "先预览站点、距离和时长变化，再由用户确认应用，保留已完成站点。"
      }
    }
  ],
  "notes": [
    {
      "title": {
        "en": "The problem to validate",
        "zh": "从问题与假设出发"
      },
      "text": {
        "en": "The concept asks whether visitors need help turning many saved places into a route they can actually complete. Personas and pain points are hypotheses, not fabricated interview findings.",
        "zh": "项目关注游客能否把收藏地点转化为可完成的路线。画像与痛点是待验证假设，不是虚构的访谈结论。"
      }
    },
    {
      "title": {
        "en": "A division of responsibility",
        "zh": "让 AI 与确定性规则各司其职"
      },
      "text": {
        "en": "The production design separates intent understanding and cultural explanation from map routing and constraint checks. The prototype demonstrates the interaction through local rules rather than claiming a connected agent.",
        "zh": "生产方案把意图理解、文化解释与路网算路、约束校验分开。原型通过本地规则展示交互，不包装成已接入的真实智能体。"
      }
    },
    {
      "title": {
        "en": "A travel journal that remains usable",
        "zh": "手账感服务于文化探索"
      },
      "text": {
        "en": "Three visual directions led to a journal-inspired system: blue graph paper, architectural doodles and photographic-style imagery, with clear functional typography and a persistent main action.",
        "zh": "从三套方向选出旅行手账方案：蓝色方格纸、建筑手绘与实拍风格图片；功能文字保持清晰，主要操作始终易于找到。"
      }
    },
    {
      "title": {
        "en": "Validation without inflated outcomes",
        "zh": "把原型检查与产品成效分开"
      },
      "text": {
        "en": "Browser checks cover preferences, map selection, culture notes, local saving and confirmed route changes. Live navigation, user research and commercial metrics remain unvalidated.",
        "zh": "浏览器检查覆盖偏好、地图选点、文化内容、本机保存与确认调整。真实导航、用户研究和商业指标仍未验证。"
      }
    }
  ],
  "media": [
    {
      "id": "overview",
      "type": "image",
      "src": "citywalk/overview.png",
      "full": "citywalk/overview.png",
      "width": 1400,
      "height": 762,
      "title": {
        "en": "From preferences to a cultural walk",
        "zh": "从偏好到一段文化漫步"
      },
      "label": {
        "en": "Prototype overview",
        "zh": "原型概览"
      },
      "caption": {
        "en": "Screens from the implemented mobile prototype. AI and route data are simulated; photographic-style images are AI-generated.",
        "zh": "来自已实现的手机端原型。AI 与路线数据为模拟，实拍风格图片为 AI 生成。"
      }
    },
    {
      "id": "route",
      "type": "image",
      "src": "citywalk/route.png",
      "width": 393,
      "height": 852,
      "title": {
        "en": "One map, one shared stop sequence",
        "zh": "地图与站点，共用同一条线索"
      },
      "label": {
        "en": "Route & map",
        "zh": "路线与地图"
      },
      "caption": {
        "en": "Numbered stop selection and a clearly labelled illustrative map, with time, distance and cost estimates.",
        "zh": "编号选点与明确标识的示意地图，同时呈现时长、距离和费用估算。"
      }
    },
    {
      "id": "detail",
      "type": "image",
      "src": "citywalk/detail.png",
      "width": 393,
      "height": 852,
      "title": {
        "en": "A place, a story",
        "zh": "每一处地方，都有一段故事"
      },
      "label": {
        "en": "Cultural detail",
        "zh": "景点与文化"
      },
      "caption": {
        "en": "Cultural summaries, source explanations and practical information belong to the same place context.",
        "zh": "文化摘要、资料来源与实用信息围绕同一个地点展开。"
      }
    }
  ],
  "image": "citywalk/overview.png"
};
