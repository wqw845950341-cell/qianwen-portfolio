// Verified project content and demo destinations, refreshed 2026-11-05.
export const refreshProjects = [
  {
    "id": 1,
    "title": {
      "en": "AI Commerce Assistant",
      "zh": "AI 电商运营助手"
    },
    "short": "AI Commerce",
    "icon": "commerce",
    "headline": {
      "en": "Evidence before advice.",
      "zh": "先有证据，再谈建议。"
    },
    "question": {
      "en": "What evidence should come before an operational suggestion?",
      "zh": "提出运营建议前，需要哪些证据？"
    },
    "focus": {
      "en": "Evidence-led AI workflows",
      "zh": "有证据的 AI 工作流"
    },
    "status": {
      "en": "Practice project",
      "zh": "练习项目"
    },
    "scope": {
      "en": "Coze practice with synthetic store cases. Real-store integration, commercial impact and implemented NL2SQL are not claimed.",
      "zh": "基于 Coze 与模拟店铺案例的练习，不宣称真实店铺接入、商业改善或已实现 NL2SQL。"
    },
    "role": {
      "en": "Workflow design · Coze practice",
      "zh": "工作流设计 · Coze 实践"
    },
    "tools": "Coze · Retrieval · Prompt design",
    "url": "https://www.coze.cn/store/agent/7674848296376221738?bot_id=true",
    "repo": null,
    "context": {
      "en": "Practice scenarios with synthetic store data.",
      "zh": "使用模拟店铺数据的经营诊断场景。"
    },
    "approach": {
      "en": "Check metric definitions, retrieve evidence and distinguish candidate causes from observations.",
      "zh": "核对指标口径、检索证据，并区分观察与候选原因。"
    },
    "delivery": [
      {
        "en": "Coze workflow",
        "zh": "Coze 工作流"
      },
      {
        "en": "Evidence-linked replies",
        "zh": "带证据引用的回复"
      },
      {
        "en": "Insufficient-evidence handling",
        "zh": "证据不足时的处理方式"
      }
    ],
    "validation": {
      "en": "Scenario-based review with iterative refinement.",
      "zh": "基于模拟场景的检查与迭代。"
    },
    "nextTest": {
      "en": "Review source use, missing evidence and response boundaries.",
      "zh": "检查来源引用、缺失证据与回复边界。"
    },
    "steps": [
      {
        "label": {
          "en": "Metrics",
          "zh": "指标"
        },
        "detail": {
          "en": "Start by checking time ranges, denominators and metric definitions so that the question is consistent before analysis begins.",
          "zh": "先核对时间范围、分母与指标定义，让分析建立在一致的问题上。"
        }
      },
      {
        "label": {
          "en": "Evidence",
          "zh": "证据"
        },
        "detail": {
          "en": "Retrieve public references and original practice SOPs. Explain what each source can support and what it cannot establish about a particular store.",
          "zh": "检索公开参考与原创练习 SOP，说明资料能支持什么，以及它无法证明的店铺具体原因。"
        }
      },
      {
        "label": {
          "en": "Causes",
          "zh": "原因"
        },
        "detail": {
          "en": "Separate observed signals from candidate explanations, and ask for the missing evidence needed to tell alternatives apart.",
          "zh": "区分观察信号与候选解释，提出区分不同原因所需的补充证据。"
        }
      },
      {
        "label": {
          "en": "Review",
          "zh": "复核"
        },
        "detail": {
          "en": "Keep diagnosis within the requested scope. Offer strategy suggestions when requested, with the supporting evidence and remaining uncertainty visible.",
          "zh": "按问题范围给出诊断；在被要求时提供策略建议，同时保留证据与不确定性。"
        }
      }
    ],
    "scenarios": [
      {
        "en": "Traffic decline",
        "zh": "流量下降"
      },
      {
        "en": "Stockouts & conversion",
        "zh": "缺货与转化"
      },
      {
        "en": "Product mix & basket size",
        "zh": "商品结构与客单价"
      },
      {
        "en": "Advertising ROAS",
        "zh": "广告 ROAS"
      },
      {
        "en": "Refunds",
        "zh": "退款"
      },
      {
        "en": "Insufficient evidence",
        "zh": "证据不足"
      }
    ],
    "notes": [
      {
        "title": {
          "en": "The problem",
          "zh": "问题"
        },
        "text": {
          "en": "An operational question can look simple while mixing several metric definitions or relying on an unsupported cause. This practice explores how an assistant can make its evidence and limits visible.",
          "zh": "运营问题表面简单，却可能混用指标口径，或过早接受一个缺乏证据的原因。这个练习关注助手如何展示证据与判断边界。"
        }
      },
      {
        "title": {
          "en": "What I worked on",
          "zh": "我的工作"
        },
        "text": {
          "en": "Coze agent configuration, workflow iteration, and a practice knowledge base combining public references, original SOPs and six synthetic commerce scenarios.",
          "zh": "配置 Coze Agent、迭代诊断流程，并组织公开参考、原创 SOP 与六组模拟经营场景构成的练习知识库。"
        }
      },
      {
        "title": {
          "en": "A deliberate boundary",
          "zh": "关键边界"
        },
        "text": {
          "en": "A public reference explains a general mechanism; it does not prove the cause of a specific store change. Missing evidence should lead to a clear question or a limited answer.",
          "zh": "公开资料解释一般机制，不能直接证明某家店铺变化的原因。缺失证据应转化为明确的问题或有限结论。"
        }
      },
      {
        "title": {
          "en": "Evaluation focus",
          "zh": "验证重点"
        },
        "text": {
          "en": "Review consistency of definitions, source relevance, the separation of observations and causes, and whether the reply correctly handles insufficient evidence. No commercial performance is claimed.",
          "zh": "检查口径一致性、来源相关性、观察与原因的区分，以及证据不足时的回复方式，不将练习包装为商业绩效。"
        }
      }
    ],
    "media": [],
    "key": "commerce",
    "category": "AI",
    "image": null
  },
  {
    "id": 2,
    "title": {
      "en": "PosturePal",
      "zh": "PosturePal"
    },
    "short": "PosturePal",
    "icon": "product",
    "headline": {
      "en": "A nudge, at the right moment.",
      "zh": "在合适的时刻，轻轻提醒。"
    },
    "question": {
      "en": "When should a focus companion interrupt?",
      "zh": "专注陪伴产品应在什么时候提醒？"
    },
    "focus": {
      "en": "Product loops & engagement",
      "zh": "产品闭环与参与体验"
    },
    "status": {
      "en": "Product prototype",
      "zh": "产品原型"
    },
    "scope": {
      "en": "A posture-awareness and focus prototype. Real-world recognition accuracy, lasting habit changes and measured retention lift have not been established.",
      "zh": "姿态感知与专注陪伴原型，尚未建立真实场景识别准确率、长期习惯改善或留存提升的实测结论。"
    },
    "role": {
      "en": "Product logic · Interaction · Prototype",
      "zh": "产品逻辑 · 交互 · 原型"
    },
    "tools": "React · MediaPipe concept · Interaction design",
    "url": "https://wqw845950341-cell.github.io/posturepal-portfolio/",
    "repo": "https://github.com/wqw845950341-cell/posturepal-portfolio",
    "context": {
      "en": "A focus companion for people working at a desk.",
      "zh": "面向长期伏案场景的专注陪伴产品。"
    },
    "approach": {
      "en": "Connect calibration, persistence, reminders and feedback in a considered loop.",
      "zh": "把校准、持续性判断、提醒与反馈连接成清楚的闭环。"
    },
    "delivery": [
      {
        "en": "User journeys & product loop",
        "zh": "用户旅程与产品闭环"
      },
      {
        "en": "Persistence & cooldown rules",
        "zh": "持续性与冷却规则"
      },
      {
        "en": "Interactive interface prototype",
        "zh": "交互界面原型"
      }
    ],
    "validation": {
      "en": "A plan for recognition, interruption and engagement review.",
      "zh": "识别、打断与参与体验的验证设计。"
    },
    "nextTest": {
      "en": "Review false reminders, cooldowns and low-confidence states.",
      "zh": "检查误提醒、冷却机制与低置信度状态。"
    },
    "steps": [
      {
        "label": {
          "en": "Calibrate",
          "zh": "校准"
        },
        "detail": {
          "en": "Use a personal baseline and consider the camera angle, light and occlusion before interpreting posture signals.",
          "zh": "建立个人基线，在解释姿态信号前考虑镜头角度、光线和遮挡。"
        }
      },
      {
        "label": {
          "en": "Observe",
          "zh": "观察"
        },
        "detail": {
          "en": "Distinguish a brief movement from a persistent state. Low confidence, occlusion and absence need understandable fallback behaviour.",
          "zh": "区分短暂动作与持续状态，并为低置信度、遮挡和离席设计清楚的兜底。"
        }
      },
      {
        "label": {
          "en": "Nudge",
          "zh": "提醒"
        },
        "detail": {
          "en": "Escalate reminders deliberately and use cooldowns to avoid repeated interruption during a focus session.",
          "zh": "逐步增强提醒，通过冷却规则减少专注过程中的重复打断。"
        }
      },
      {
        "label": {
          "en": "Reflect",
          "zh": "反馈"
        },
        "detail": {
          "en": "Make a session understandable through feedback and companion progression, while keeping long-term outcomes as questions to validate.",
          "zh": "用反馈与伙伴成长帮助理解专注过程，并把长期效果留作待验证的问题。"
        }
      }
    ],
    "notes": [
      {
        "title": {
          "en": "The product question",
          "zh": "产品问题"
        },
        "text": {
          "en": "A reminder must be timely enough to help and quiet enough to respect the task. The prototype explores this balance through persistence, graded nudges and cooldowns.",
          "zh": "提醒既要及时，也要尊重当前任务。原型通过持续性判断、分级提醒与冷却机制，探索这两者之间的平衡。"
        }
      },
      {
        "title": {
          "en": "What I worked on",
          "zh": "我的工作"
        },
        "text": {
          "en": "Product positioning, journeys, feature architecture, posture-rule design, progression feedback and the React / MediaPipe prototype framework.",
          "zh": "围绕产品定位、用户旅程、功能架构、姿态规则、成长反馈与 React / MediaPipe 原型框架开展设计。"
        }
      },
      {
        "title": {
          "en": "The key decision",
          "zh": "关键决定"
        },
        "text": {
          "en": "A single-frame deviation should not automatically create an interruption. Confidence, duration and recent reminders matter as much as the signal itself.",
          "zh": "单帧偏离不应自动造成打断。置信度、持续时间与最近提醒记录，同样影响是否介入。"
        }
      },
      {
        "title": {
          "en": "How to learn from it",
          "zh": "如何继续验证"
        },
        "text": {
          "en": "Test recognition in realistic conditions, inspect unnecessary reminders and ask whether the feedback is understandable. Habit and retention outcomes require observation over time.",
          "zh": "在真实条件下测试识别、检查不必要提醒，并验证反馈是否易懂。习惯与留存效果需要持续观察。"
        }
      }
    ],
    "media": [
      {
        "id": "interface",
        "type": "image",
        "src": "posture-interface.webp",
        "full": "posture-interface.png",
        "width": 1440,
        "height": 1024,
        "title": {
          "en": "A quieter kind of feedback.",
          "zh": "让反馈更温和。"
        },
        "label": {
          "en": "Public prototype interface",
          "zh": "公开原型界面"
        },
        "caption": {
          "en": "Product interface and companion environment. This documents the prototype, not measured recognition or habit outcomes.",
          "zh": "产品界面与伙伴环境，用于记录原型形态，不代表识别准确率或习惯改善的实测结果。"
        }
      }
    ],
    "key": "posture",
    "category": "AI",
    "image": "posture-interface.webp"
  },
  {
    "id": 3,
    "title": {
      "en": "HCMC Greening Dashboard",
      "zh": "HCMC 绿化研究看板"
    },
    "short": "HCMC Greening",
    "icon": "data",
    "headline": {
      "en": "Research data, made explorable.",
      "zh": "让研究数据，可以被探索。"
    },
    "question": {
      "en": "How can research data support clearer spatial decisions?",
      "zh": "如何让研究数据支持更清楚的空间判断？"
    },
    "focus": {
      "en": "Data analysis & visualization",
      "zh": "数据分析与可视化"
    },
    "status": {
      "en": "Research prototype",
      "zh": "研究原型"
    },
    "scope": {
      "en": "Static research sample points and supplied classifications, not a live city feed or a complete inventory of street segments. Proposed interventions are not measured policy outcomes.",
      "zh": "使用静态研究样本点与既有分类，并非实时城市数据或完整街段清单；拟议干预不代表政策成效。"
    },
    "role": {
      "en": "Research workflow · Data · Interface",
      "zh": "研究流程 · 数据 · 界面"
    },
    "tools": "Python · QGIS · React · Research methods",
    "url": "https://wqw845950341-cell.github.io/HCMC-Street-Greening-Dashboard/",
    "repo": "https://github.com/wqw845950341-cell/HCMC-Street-Greening-Dashboard",
    "context": {
      "en": "A bilingual interface for street-greening research.",
      "zh": "用于探索街道绿化研究的双语界面。"
    },
    "approach": {
      "en": "Connect classifications, filters and spatial context in one decision interface.",
      "zh": "在同一决策界面连接分类、筛选与空间语境。"
    },
    "delivery": [
      {
        "en": "Linked filters & sample map",
        "zh": "联动筛选与样本地图"
      },
      {
        "en": "Before / proposed comparisons",
        "zh": "现状与拟议方案对照"
      },
      {
        "en": "Methodology & research boards",
        "zh": "研究方法与图板"
      }
    ],
    "validation": {
      "en": "Review data definitions, classifications and interaction consistency.",
      "zh": "核对数据定义、分类与交互一致性。"
    },
    "nextTest": {
      "en": "Check whether users can explain a classification and its limits.",
      "zh": "检查使用者能否理解分类及其局限。"
    },
    "steps": [
      {
        "label": {
          "en": "Samples",
          "zh": "样本"
        },
        "detail": {
          "en": "Preserve the 8,915 supplied research points and their Grade / Type classifications. Samples are not equivalent to complete street segments.",
          "zh": "保留 8,915 个研究样本点及其 Grade / Type 分类，区分样本与完整街段。"
        }
      },
      {
        "label": {
          "en": "Assess",
          "zh": "评估"
        },
        "detail": {
          "en": "Keep the multi-scale research models and weighting definitions explicit; avoid silently joining unmatched legacy data.",
          "zh": "明确多尺度研究模型与权重定义，避免把未经核对的旧数据直接拼接。"
        }
      },
      {
        "label": {
          "en": "Compare",
          "zh": "对照"
        },
        "detail": {
          "en": "Link typologies and grades to proposed strategies and visual comparisons, while preserving the distinction between current and proposed conditions.",
          "zh": "把类型与等级连接到拟议策略和视觉比较，同时保留现状与方案的区别。"
        }
      },
      {
        "label": {
          "en": "Explore",
          "zh": "探索"
        },
        "detail": {
          "en": "Use bilingual filters, map interaction, CSV export and research boards to support a transparent reading of the study.",
          "zh": "用双语筛选、地图交互、CSV 导出与研究图板，让研究过程可以被清楚阅读。"
        }
      }
    ],
    "notes": [
      {
        "title": {
          "en": "From research to a usable tool",
          "zh": "从研究到工具"
        },
        "text": {
          "en": "A research result becomes more useful when people can inspect its classifications, move between scales and see what the proposed interventions address. The dashboard makes that reading process interactive.",
          "zh": "当使用者能够检查分类、理解不同尺度，并看到拟议干预回应的问题，研究结果就更容易被使用。看板把这一阅读过程转为交互。"
        }
      },
      {
        "title": {
          "en": "What I worked on",
          "zh": "我的工作"
        },
        "text": {
          "en": "Research workflow, data architecture, multi-scale evaluation rules and an interactive dashboard connecting sample maps, intervention strategies and original boards.",
          "zh": "组织研究流程、数据架构、多尺度评价规则与交互看板，连接样本地图、干预策略与原创研究图板。"
        }
      },
      {
        "title": {
          "en": "The key decision",
          "zh": "关键决定"
        },
        "text": {
          "en": "Preserve supplied data definitions instead of adding precision that the data cannot support. A sample point, a street segment and a proposed outcome are different things.",
          "zh": "保留原始数据定义，避免添加数据无法支持的精度。样本点、街段与拟议效果是不同概念。"
        }
      },
      {
        "title": {
          "en": "Evaluation focus",
          "zh": "验证重点"
        },
        "text": {
          "en": "Check linked filter counts, empty states, accessible comparisons and export consistency. Keep research interpretation separate from claims of a built intervention or policy effect.",
          "zh": "检查联动筛选计数、空状态、可访问的对照操作与导出一致性，并区分研究解读、实际建设与政策效果。"
        }
      }
    ],
    "media": [
      {
        "id": "map",
        "type": "image",
        "src": "hcmc-interface.webp",
        "full": "hcmc-interface.png",
        "width": 1440,
        "height": 1024,
        "title": {
          "en": "Read the city through its samples.",
          "zh": "通过样本，阅读城市。"
        },
        "label": {
          "en": "Public research dashboard",
          "zh": "公开研究看板"
        },
        "caption": {
          "en": "Static sample map with grade and typology filters. Original research interface retained as evidence.",
          "zh": "带等级与类型筛选的静态样本地图，保留原始研究界面作为证据。"
        }
      }
    ],
    "key": "hcmc",
    "category": "Research",
    "image": "hcmc-interface.webp"
  },
  {
    "id": 4,
    "title": {
      "en": "Teddi Lab",
      "zh": "Teddi Lab"
    },
    "short": "Teddi Lab",
    "icon": "creative",
    "headline": {
      "en": "One idea. A repeatable content system.",
      "zh": "一个主题，一套可持续的内容体系。"
    },
    "question": {
      "en": "How can one brand idea travel across channels?",
      "zh": "如何让同一个品牌主题进入不同传播场景？"
    },
    "focus": {
      "en": "AI creative operations",
      "zh": "AI 创意与内容运营"
    },
    "status": {
      "en": "Independent proposal",
      "zh": "独立策划提案"
    },
    "scope": {
      "en": "An uncommissioned, unexecuted proposal. Fictional AI creators illustrate possible collaborations; no commercial results or actual endorsements are claimed.",
      "zh": "未经品牌委托、尚未执行的自主提案。AI 虚构人物用于合作示意，不代表真实代言或商业成绩。"
    },
    "role": {
      "en": "Strategy · Creative · Digital",
      "zh": "策略 · 创意 · 网页体验"
    },
    "tools": "AI imagery · Bilingual copy · React",
    "url": "https://wqw845950341-cell.github.io/teddi-lab-portfolio/",
    "repo": "https://github.com/wqw845950341-cell/teddi-lab-portfolio",
    "context": {
      "en": "An independent brand and social campaign proposal.",
      "zh": "围绕品牌理解与社媒传播展开的独立提案。"
    },
    "approach": {
      "en": "Translate brand insight into a reusable creative system.",
      "zh": "把品牌洞察转化为可复用的创意与内容体系。"
    },
    "delivery": [
      {
        "en": "Bilingual campaign",
        "zh": "双语 Campaign"
      },
      {
        "en": "Instagram / TikTok creative",
        "zh": "Instagram / TikTok 创意素材"
      },
      {
        "en": "Concept film & publishing plan",
        "zh": "概念短片与内容发布计划"
      }
    ],
    "validation": {
      "en": "A proposed A/B learning plan.",
      "zh": "拟议的 A/B 验证与复盘计划。"
    },
    "nextTest": {
      "en": "Compare opening hooks using qualified product-detail visits.",
      "zh": "用有效商品资料访问，比较不同开场方式。"
    },
    "steps": [
      {
        "label": {
          "en": "Research",
          "zh": "研究"
        },
        "detail": {
          "en": "Read the product, bear symbol and accessory world together. Find the questions that sit between recognition and understanding.",
          "zh": "把产品、小熊符号与配饰世界放在一起分析，寻找从认出品牌到理解选择之间的问题。"
        }
      },
      {
        "label": {
          "en": "Create",
          "zh": "创作"
        },
        "detail": {
          "en": "Develop “Make room for you” as an original bilingual idea, supported by varied AI-generated scenes and clear product context.",
          "zh": "以“为自己留一格”为原创双语主题，结合不同 AI 情境与清楚的产品语境。"
        }
      },
      {
        "label": {
          "en": "Adapt",
          "zh": "适配"
        },
        "detail": {
          "en": "Give feed, story and short-form video different jobs, while keeping the idea, brand cues and information route consistent.",
          "zh": "让信息流、限时动态与短视频各有任务，同时保留一致的主题、识别元素与信息入口。"
        }
      },
      {
        "label": {
          "en": "Test",
          "zh": "验证"
        },
        "detail": {
          "en": "Plan a controlled opening-hook comparison. Keep the product, audience, destination and metric definition aligned before interpreting a difference.",
          "zh": "规划开场方式对照，先统一产品、受众、落地页与指标口径，再解释差异。"
        }
      }
    ],
    "notes": [
      {
        "title": {
          "en": "The opportunity",
          "zh": "品牌机会"
        },
        "text": {
          "en": "Teddi Lab connects a recognisable bear form with nutrition products, accessories and personal expression. The proposal asks how useful content can carry attention into a clearer next choice.",
          "zh": "Teddi Lab 用可识别的小熊形态连接营养产品、配饰与个人表达。提案关注：如何用有用的内容，把注意力带向更清楚的下一步选择。"
        }
      },
      {
        "title": {
          "en": "What I worked on",
          "zh": "我的工作"
        },
        "text": {
          "en": "Brand diagnosis, international case mechanisms, bilingual campaign copy, AI scene direction, platform creative boards, creator-collaboration concepts and the digital presentation. A supplied seven-second film is included as a separate visual concept.",
          "zh": "完成品牌诊断、国际案例机制提取、双语文案、AI 场景方向、平台创意板、创作者合作概念与网页呈现；另将用户提供的 7 秒短片纳入独立动态创意。"
        }
      },
      {
        "title": {
          "en": "The key decision",
          "zh": "关键决定"
        },
        "text": {
          "en": "Keep one campaign idea, but vary the scene and channel role. Creator introductions, seasonal visuals, unboxing and label-reading make different contributions rather than repeating one image.",
          "zh": "保持一个主题，改变场景与渠道任务。创作者介绍、季节主视觉、开箱与标签阅读分别承担不同作用，形成连续内容。"
        }
      },
      {
        "title": {
          "en": "How I would evaluate it",
          "zh": "如何验证"
        },
        "text": {
          "en": "The four-week pilot separates planned outputs from outcomes. An opening-hook test would compare qualified visits under consistent definitions, then review which content questions should shape the next brief.",
          "zh": "四周试点区分计划产出与实际结果。开场对照需使用统一口径的有效访问，并复盘哪些用户问题应进入下一轮选题。"
        }
      }
    ],
    "media": [
      {
        "id": "film",
        "type": "video",
        "src": "teddi-social-film.mp4",
        "poster": "teddi-film-poster.webp",
        "width": 1280,
        "height": 720,
        "title": {
          "en": "An unexpected bear.",
          "zh": "意外出现的小熊。"
        },
        "label": {
          "en": "Motion concept · 00:07",
          "zh": "动态创意 · 00:07"
        },
        "caption": {
          "en": "A supplied seven-second visual concept. Original video retained; no campaign-performance claim.",
          "zh": "用户提供的 7 秒视觉概念短片，保留原视频，不宣称投放成绩。"
        }
      },
      {
        "id": "overview",
        "type": "image",
        "src": "teddi-overview.webp",
        "full": "teddi-overview.png",
        "width": 1672,
        "height": 941,
        "title": {
          "en": "Social, in context.",
          "zh": "放进社交语境。"
        },
        "label": {
          "en": "Instagram × TikTok",
          "zh": "Instagram × TikTok"
        },
        "caption": {
          "en": "Independent creative concepts, including fictional AI creators. Not real KOL endorsements.",
          "zh": "独立推广概念，含 AI 虚构创作者，并非真实 KOL 代言。"
        }
      },
      {
        "id": "instagram",
        "type": "image",
        "src": "teddi-instagram.webp",
        "full": "teddi-instagram.png",
        "width": 1536,
        "height": 1024,
        "title": {
          "en": "A different job for every format.",
          "zh": "每种形式，各有分工。"
        },
        "label": "Feed / Stories / Reels",
        "caption": {
          "en": "Seasonal product story, creator-led question and unboxing concepts.",
          "zh": "季节产品叙事、创作者提问与开箱的概念适配。"
        }
      },
      {
        "id": "tiktok",
        "type": "image",
        "src": "teddi-tiktok.webp",
        "full": "teddi-tiktok.png",
        "width": 1536,
        "height": 1024,
        "title": {
          "en": "A human opening. A useful next step.",
          "zh": "用人物开场，用信息承接。"
        },
        "label": {
          "en": "15s sequence concept",
          "zh": "15 秒结构概念"
        },
        "caption": {
          "en": "A planned creator opening, reading checklist and styling sequence. Not a completed ad film.",
          "zh": "创作者开场、阅读清单与穿搭的拟议结构，尚非广告成片。"
        }
      }
    ],
    "key": "teddi",
    "category": "Creative",
    "image": "teddi-overview.webp"
  },
  {
    "id": 5,
    "title": {
      "en": "RedLens · Search Ad Lab",
      "zh": "RedLens · 搜索广告实验台"
    },
    "short": "RedLens",
    "icon": "search",
    "headline": {
      "en": "Relevant to the search. Right for the person?",
      "zh": "搜得到，也要判断是否适合。"
    },
    "question": {
      "en": "Can an ad help people judge fit before they click?",
      "zh": "广告能否在点击前，帮助用户判断是否适合自己？"
    },
    "focus": {
      "en": "Search ads & commercialization",
      "zh": "搜索广告与商业化产品"
    },
    "status": {
      "en": "Independent product prototype",
      "zh": "独立商业化产品原型"
    },
    "scope": {
      "en": "An independent prototype exploring Xiaohongshu search advertising, not an official platform tool. The projector, notes and specifications are fictional. Local rules power diagnosis and fit checks; live AI, ad accounts, user research and real campaign results are not claimed.",
      "zh": "围绕小红书搜索广告的独立原型，非官方工具。商品、笔记和规格为虚构示例；诊断与适配使用本地规则，尚未连接真实 AI 或广告账户，也无真实用户研究与投放结果。"
    },
    "role": {
      "en": "Business framing · Product logic · Prototype",
      "zh": "业务分析 · 产品逻辑 · 交互原型"
    },
    "tools": "JavaScript · Evidence rules · Human review · Experiment design",
    "url": "./demos/redlens/index.html",
    "repo": null,
    "demoLabel": {
      "en": "Try the working prototype (Chinese)",
      "zh": "体验完整原型（中文）"
    },
    "keywords": [
      "小红书",
      "Xiaohongshu",
      "REDnote",
      "RedLens",
      "商业化",
      "搜索广告",
      "advertising"
    ],
    "context": {
      "en": "A merchant workspace for Xiaohongshu search-ad scenarios: category relevance does not establish suitability.",
      "zh": "面向小红书搜索广告的商家工作台：品类相关，并不等于适合具体使用场景。"
    },
    "approach": {
      "en": "Connect search intent, product evidence, usage conditions and an editable ad preview.",
      "zh": "连接搜索意图、商品依据、使用条件与可编辑的广告预览。"
    },
    "delivery": [
      {
        "en": "Evidence & information-gap diagnosis",
        "zh": "证据与信息缺口诊断"
      },
      {
        "en": "Fit checks & reviewed drafts",
        "zh": "场景适配与草稿审核"
      },
      {
        "en": "Search preview & experiment export",
        "zh": "搜索预览与实验方案导出"
      }
    ],
    "validation": {
      "en": "Rule checks implemented; task testing and a controlled ad experiment proposed.",
      "zh": "已实现规则核对；任务测试与广告对照实验为待执行方案。"
    },
    "nextTest": {
      "en": "Compare decision time and errors, then evaluate target actions per 1,000 impressions, cost and negative feedback—not CTR alone.",
      "zh": "先比较判断耗时与错误率，再观察每千次曝光目标行为、成本与负反馈，避免只看 CTR。"
    },
    "steps": [
      {
        "label": {
          "en": "Intent",
          "zh": "意图"
        },
        "detail": {
          "en": "Use “a projector for a rented bedroom” to connect a search with practical questions: distance, mounting, light and noise. Let the merchant adjust the proposed concerns.",
          "zh": "以“租房卧室投影仪”为例，把搜索词转为距离、安装、光线与噪音等实际问题，并允许商家调整关注点。"
        }
      },
      {
        "label": {
          "en": "Evidence",
          "zh": "证据"
        },
        "detail": {
          "en": "Locate the original specification behind each statement. Distinguish documented conditions, explicit limitations and missing evidence. A phrase such as “quiet” is not a noise test.",
          "zh": "把每个表述连回商品资料，区分有说明、存在限制与缺少依据。“安静”等宣传语不能替代噪音测试。"
        }
      },
      {
        "label": {
          "en": "Preview",
          "zh": "预览"
        },
        "detail": {
          "en": "Check distance, target screen size, light and mounting. Review two locally assembled, cited drafts before applying one. Keep the ad label, restrictions and unknowns visible in the search preview.",
          "zh": "核对距离、目标尺寸、光线与安装条件。两版带引用的本地编排草稿须审核后应用；搜索预览保留广告标识、限制和未知信息。"
        }
      },
      {
        "label": {
          "en": "Experiment",
          "zh": "实验"
        },
        "detail": {
          "en": "Compare the original note with a scene-informed version, keeping product, imagery and bidding conditions aligned. Define user-level randomization, attribution and guardrails before a real test.",
          "zh": "对照原笔记与场景依据版本，统一商品、图片及出价条件。真实实验前明确用户随机分组、归因窗口与体验护栏。"
        }
      }
    ],
    "notes": [
      {
        "title": {
          "en": "The commercial question",
          "zh": "商业问题"
        },
        "text": {
          "en": "The hypothesis is a gap between an ad being about the right product and answering a specific person’s conditions. RedLens explores merchant-side evidence editing and a decision-friendly search preview. It does not assume Xiaohongshu lacks comparable capabilities.",
          "zh": "问题假设在于：广告介绍了正确的品类，却未回答某个人的使用条件。RedLens 探索商家侧证据编辑与便于决策的搜索预览，不将其包装为小红书现有能力的空白。"
        }
      },
      {
        "title": {
          "en": "What I built",
          "zh": "我的工作"
        },
        "text": {
          "en": "Commercial framing across users, advertisers and the platform; scenario diagnosis, source references, fit rules, editable cards, a simulated search and note experience, draft review, local saving and experiment export. AI-assisted development produced a working prototype; live model integration remains unconfigured.",
          "zh": "从用户、广告主和平台三方梳理商业问题，实现场景诊断、原文引用、适配规则、卡片编辑、模拟搜索与笔记体验、草稿审核、本地保存和实验方案导出。借助 AI 辅助编程形成可操作原型，真实模型尚未配置。"
        }
      },
      {
        "title": {
          "en": "A deliberate trade-off",
          "zh": "关键取舍"
        },
        "text": {
          "en": "Keep “not suitable” and “not enough evidence” visible. Clearer restrictions may reduce unqualified clicks, so a higher CTR is not the sole definition of success. Evidence coverage is not a suitability or conversion score.",
          "zh": "保留“不适用”和“缺少依据”。透明的限制可能减少不匹配点击，因此不能把更高 CTR 作为唯一成功标准。资料覆盖率也不等于适配度或成交概率。"
        }
      },
      {
        "title": {
          "en": "How to evaluate it",
          "zh": "如何验证"
        },
        "text": {
          "en": "First test whether people judge suitability faster and with fewer errors, and whether merchants can complete the evidence task. A future ad experiment should compare target actions and revenue per 1,000 impressions, cost, negative feedback and search exits. No uplift or completed user test is claimed.",
          "zh": "先测试使用者能否更快、更准确地判断适用性，以及商家能否完成补证任务。后续广告实验比较每千次曝光的目标行为与广告收益、成本、负反馈及搜索退出；当前不宣称增长幅度或已完成用户测试。"
        }
      }
    ],
    "media": [
      {
        "id": "diagnosis",
        "type": "image",
        "src": "redlens-diagnosis.webp",
        "full": "redlens-diagnosis.png",
        "width": 1440,
        "height": 1000,
        "title": {
          "en": "From a search to missing evidence.",
          "zh": "从一次搜索，找到信息缺口。"
        },
        "label": {
          "en": "Original working prototype",
          "zh": "原始可操作原型"
        },
        "caption": {
          "en": "Captured from the original RedLens V3 workspace. Fictional projector specifications; local rules, not a live ad account.",
          "zh": "截取自原始 RedLens V3 工作台。使用虚构投影仪资料与本地规则，并非真实广告账户。"
        }
      },
      {
        "id": "fit",
        "type": "image",
        "src": "redlens-fit.webp",
        "full": "redlens-fit.png",
        "width": 1440,
        "height": 1000,
        "title": {
          "en": "The same product. Different conditions.",
          "zh": "同一件商品，不同的使用条件。"
        },
        "label": {
          "en": "Scenario fit & source checks",
          "zh": "场景适配与原文核对"
        },
        "caption": {
          "en": "A 2 m / daylight scenario reveals two conflicts and one documented match. Matches describe supplied conditions, not independently verified performance.",
          "zh": "2 米／白天场景呈现两项冲突与一项满足。满足仅指与给定资料一致，不代表独立验证的产品效果。"
        }
      },
      {
        "id": "preview",
        "type": "image",
        "src": "redlens-preview.webp",
        "full": "redlens-preview.png",
        "width": 1440,
        "height": 1000,
        "title": {
          "en": "Keep the evidence in the experience.",
          "zh": "让依据，留在阅读体验里。"
        },
        "label": {
          "en": "Search & note preview",
          "zh": "搜索与笔记预览"
        },
        "caption": {
          "en": "A simulated feed with editable scene information, a persistent ad label and limitations. Images and accounts are fictional; no real platform activity occurs.",
          "zh": "含可编辑场景信息、广告标识与限制的模拟信息流。图片和账号为示例，不发生真实平台互动。"
        }
      }
    ],
    "key": "redlens",
    "category": "Product",
    "image": "redlens-preview.webp"
  }
];
