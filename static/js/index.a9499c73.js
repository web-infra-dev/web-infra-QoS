/*! For license information please see index.a9499c73.js.LICENSE.txt */
!(function () {
  var e,
    t,
    r,
    i,
    n = {
      82674: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            default: function () {
              return f;
            },
          }),
          r("16116"),
          r("78328"),
          r("15648"),
          r("68603"),
          r("29933"),
          r("80024"),
          r("28612");
        var i = r("35250"),
          n = r("10479"),
          s = r("70079");
        r("7165"), r("19831");
        var l = r("68511"),
          a = r("29891"),
          d = r("25997"),
          o = r("90647"),
          c = r("43045");
        let u = l.styled.div`
  min-height: 100vh;
`,
          m =
            "web-infra-dev.github.io" === window.location.hostname
              ? "/web-infra-QoS/index"
              : "";
        var f = () => {
          let e = new URLSearchParams(window.location.search),
            t = e.get("product") || c.PRODUCT.MODERNJS_FRAMEWORK,
            r = e.get("metrics") || c.MENU.COMPILE_SPEED,
            [l, f] = (0, s.useState)(t),
            [p, E] = (0, s.useState)(r),
            [S, D] = (0, s.useState)([`${t}`]),
            [h, x] = (0, s.useState)([`${t}_${r}`]);
          return (
            (0, s.useEffect)(() => {
              window.history.replaceState(
                null,
                "",
                `${m}?product=${l}&metrics=${p}`
              );
            }, [l, p]),
            (0, i.jsx)(n.BrowserRouter, {
              basename: m,
              children: (0, i.jsxs)(u, {
                children: [
                  (0, i.jsx)(a.NavBar, {}),
                  (0, i.jsx)(d.SideMenu, {
                    openKeys: S,
                    selectedKeys: h,
                    onClickMenuItem: (e) => {
                      f(e.split("_")[0]), E(e.split("_")[1]), x([e]);
                    },
                    onClickSubMenu: (e) => {
                      S.includes(e)
                        ? D(S.filter((t) => t !== e))
                        : D([...S, e]);
                    },
                  }),
                  (0, i.jsx)(n.Routes, {
                    children: (0, i.jsx)(n.Route, {
                      path: "/",
                      element: (0, i.jsx)(
                        o.Content,
                        { productIndex: l, menuIndex: p },
                        l
                      ),
                    }),
                  }),
                ],
              }),
            })
          );
        };
      },
      90647: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            Content: function () {
              return o;
            },
          });
        var i = r("35250"),
          n = r("43045"),
          s = r("98277"),
          l = r("39278"),
          a = r("65619"),
          d = r("55113");
        let o = (e) =>
          (0, i.jsx)("div", {
            style: { marginLeft: 260, marginTop: 56 },
            children: (() => {
              if (e.productIndex === n.PRODUCT.RSPACK)
                return (0, i.jsx)("div", {
                  style: { padding: n.BASE_PADDING },
                  children: (0, i.jsx)("div", {
                    children: (0, i.jsx)("iframe", {
                      src: "https://web-infra-dev.github.io/rspack-ecosystem-benchmark/",
                      title: "Rspack Benchmark",
                      style: { width: "100%", height: "900px" },
                    }),
                  }),
                });
              switch (e.menuIndex) {
                case n.MENU.BUNDLE_SIZE:
                  return (0, i.jsx)(s.ContentBundleSize, {
                    productIndex: e.productIndex,
                  });
                case n.MENU.COMPILE_SPEED:
                  return (0, i.jsx)(l.ContentCompileSpeed, {
                    productIndex: e.productIndex,
                  });
                case n.MENU.INSTALL_SPEED:
                  return (0, i.jsx)(a.ContentInstallSpeed, {
                    productIndex: e.productIndex,
                  });
                case n.MENU.CLI_SPEED:
                  return (0, i.jsx)(d.ContentCliSpeed, {
                    productIndex: e.productIndex,
                  });
              }
              return null;
            })(),
          });
      },
      98277: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            ContentBundleSize: function () {
              return f;
            },
          }),
          r("26003"),
          r("40199");
        var i = r("35250");
        r("55026"), r("2856");
        var n = r("28384"),
          s = r("76930"),
          l = r("28161"),
          a = r("43045"),
          d = r("14528"),
          o = r("70079"),
          c = r("83027"),
          u = r("34031");
        let m = (e, t, r) =>
            (0, u.mergeData)(e, t, r).map((e) => ({
              category: `${e.caseName} + ${e.metricsName}`,
              x: (0, u.formatDateWithId)(e),
              y: (0, u.formatFileSize)(e.metrics[e.metricsName]),
            })),
          f = (e) => {
            let t = e.productIndex,
              r = (0, o.useRef)(null),
              u = (0, o.useRef)(null),
              {
                categories: f,
                handleAddData: p,
                renderChoicesTags: E,
              } = (0, d.useFilterResult)(
                a.BUNDLE_SIZE_DEFAULT_CASE[t],
                a.BUNDLE_SIZE_METRICS[t][0]
              ),
              S = f.map((e) => e.case),
              D = f.map((e) => e.metric),
              h = (e) => {
                let { root: r, results: i, caseNames: n, metricsNames: s } = e,
                  d = m(i, n, s);
                u.current
                  ? u.current.changeData(d)
                  : r &&
                    ((u.current = new l.Line(r, {
                      ...a.LINE_CHART_DEFAULT_CONFIG,
                      data: d,
                      yAxis: {
                        label: { formatter: (e) => `${e} KB` },
                        nice: !0,
                      },
                      tooltip: {
                        fields: ["x", "y", "category"],
                        formatter: (e) => ({
                          name: e.category,
                          value: `${e.y} KB`,
                        }),
                      },
                      slider: {
                        start: t === a.PRODUCT.MODERNJS_FRAMEWORK ? 0.85 : 0,
                        end: 1,
                      },
                    })),
                    u.current.render());
              };
            return (
              (0, o.useEffect)(() => {
                (async () => {
                  let e = S.map((e) => (0, c.fetchMetrics)(t, e));
                  h({
                    results: await Promise.all(e),
                    caseNames: S,
                    metricsNames: D,
                    root: r.current,
                  });
                })();
              }, [f]),
              (0, i.jsxs)("div", {
                style: { padding: a.BASE_PADDING },
                children: [
                  (0, i.jsx)(d.Filters, {
                    productName: t,
                    metrics: a.BUNDLE_SIZE_METRICS[t],
                    initialCase: a.BUNDLE_SIZE_DEFAULT_CASE[t],
                    handleAddData: p,
                    renderChoicesTags: E,
                  }),
                  (0, i.jsxs)(s.default, {
                    bordered: !1,
                    style: { height: 464 },
                    children: [
                      (0, i.jsx)(n.default.Title, {
                        heading: 5,
                        style: { marginTop: 0 },
                        children: "Trending",
                      }),
                      (0, i.jsx)("div", { ref: r }),
                    ],
                  }),
                ],
              })
            );
          };
      },
      55113: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            ContentCliSpeed: function () {
              return s;
            },
          });
        var i = r("35250"),
          n = r("43045");
        let s = (e) =>
          (0, i.jsx)("div", {
            style: { padding: n.BASE_PADDING },
            children: "WIP",
          });
      },
      39278: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            ContentCompileSpeed: function () {
              return f;
            },
          }),
          r("26003"),
          r("40199");
        var i = r("35250");
        r("55026"), r("2856");
        var n = r("28384"),
          s = r("76930"),
          l = r("28161"),
          a = r("43045"),
          d = r("14528"),
          o = r("70079"),
          c = r("83027"),
          u = r("34031");
        let m = (e, t, r) =>
            (0, u.mergeData)(e, t, r).map((e) => ({
              category: `${e.caseName} + ${e.metricsName}`,
              x: (0, u.formatDateWithId)(e),
              y: (0, u.formatSecond)(e.metrics[e.metricsName]),
            })),
          f = (e) => {
            let t = e.productIndex,
              r = (0, o.useRef)(null),
              u = (0, o.useRef)(null),
              {
                categories: f,
                handleAddData: p,
                renderChoicesTags: E,
              } = (0, d.useFilterResult)(
                a.COMPILE_SPEED_DEFAULT_CASE[t],
                a.COMPILE_SPEED_METRICS[t][0]
              ),
              S = f.map((e) => e.case),
              D = f.map((e) => e.metric),
              h = (e) => {
                let { root: r, results: i, caseNames: n, metricsNames: s } = e,
                  d = m(i, n, s);
                u.current
                  ? u.current.changeData(d)
                  : r &&
                    ((u.current = new l.Line(r, {
                      ...a.LINE_CHART_DEFAULT_CONFIG,
                      data: d,
                      yAxis: {
                        label: { formatter: (e) => `${e} s` },
                        nice: !0,
                      },
                      tooltip: {
                        fields: ["x", "y", "category"],
                        formatter: (e) => ({
                          name: e.category,
                          value: e.y + "s",
                        }),
                      },
                      slider: {
                        start: t === a.PRODUCT.MODERNJS_FRAMEWORK ? 0.85 : 0,
                        end: 1,
                      },
                    })),
                    u.current.render());
              };
            return (
              (0, o.useEffect)(() => {
                (async () => {
                  let e = S.map((e) => (0, c.fetchMetrics)(t, e));
                  h({
                    results: await Promise.all(e),
                    caseNames: S,
                    metricsNames: D,
                    root: r.current,
                  });
                })();
              }, [f]),
              (0, i.jsxs)("div", {
                style: { padding: a.BASE_PADDING },
                children: [
                  (0, i.jsx)(d.Filters, {
                    productName: t,
                    metrics: a.COMPILE_SPEED_METRICS[t],
                    initialCase: a.COMPILE_SPEED_DEFAULT_CASE[t],
                    handleAddData: p,
                    renderChoicesTags: E,
                  }),
                  (0, i.jsxs)(s.default, {
                    bordered: !1,
                    style: { height: 464 },
                    children: [
                      (0, i.jsx)(n.default.Title, {
                        heading: 5,
                        style: { marginTop: 0 },
                        children: "Trending",
                      }),
                      (0, i.jsx)("div", { ref: r }),
                    ],
                  }),
                ],
              })
            );
          };
      },
      65619: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            ContentInstallSpeed: function () {
              return f;
            },
          }),
          r("26003"),
          r("40199");
        var i = r("35250");
        r("55026"), r("2856");
        var n = r("28384"),
          s = r("76930"),
          l = r("28161"),
          a = r("43045"),
          d = r("14528"),
          o = r("70079"),
          c = r("83027"),
          u = r("34031");
        let m = (e, t, r) =>
            (0, u.mergeData)(e, t, r).map((e) => {
              let t;
              let r = e.metrics[e.metricsName];
              switch (e.metricsName) {
                case "installSize":
                  t = (0, u.formatFileSize)(r, "MB");
                  break;
                case "hotInstallTime":
                case "coldInstallTime":
                  t = (0, u.formatSecond)(r);
                  break;
                default:
                  t = r;
              }
              return {
                metricsName: e.metricsName,
                category: `${e.caseName} + ${e.metricsName}`,
                x: (0, u.formatDateWithId)(e),
                y: t,
              };
            }),
          f = (e) => {
            let t = e.productIndex,
              r = (0, o.useRef)(null),
              u = (0, o.useRef)(null),
              {
                categories: f,
                handleAddData: p,
                renderChoicesTags: E,
              } = (0, d.useFilterResult)(
                a.INSTALL_SPEED_DEFAULT_CASE[t],
                a.INSTALL_SPEED_METRICS[t][0]
              ),
              S = f.map((e) => e.case),
              D = f.map((e) => e.metric),
              h = (e) => {
                let { root: r, results: i, caseNames: n, metricsNames: s } = e,
                  d = m(i, n, s);
                u.current
                  ? u.current.changeData(d)
                  : r &&
                    ((u.current = new l.Line(r, {
                      ...a.LINE_CHART_DEFAULT_CONFIG,
                      data: d,
                      tooltip: {
                        fields: ["x", "y", "category", "metricsName"],
                        formatter: (e) => {
                          let t = e.y;
                          return (
                            "installSize" === e.metricsName && (t += "MB"),
                            ("coldInstallTime" === e.metricsName ||
                              "hotInstallTime" === e.metricsName) &&
                              (t += "s"),
                            { name: e.category, value: t }
                          );
                        },
                      },
                      slider: {
                        start: t === a.PRODUCT.MODERNJS_FRAMEWORK ? 0.85 : 0,
                        end: 1,
                      },
                    })),
                    u.current.render());
              };
            return (
              (0, o.useEffect)(() => {
                (async () => {
                  let e = S.map((e) => (0, c.fetchMetrics)(t, e));
                  h({
                    results: await Promise.all(e),
                    caseNames: S,
                    metricsNames: D,
                    root: r.current,
                  });
                })();
              }, [f]),
              (0, i.jsxs)("div", {
                style: { padding: a.BASE_PADDING },
                children: [
                  (0, i.jsx)(d.Filters, {
                    productName: t,
                    metrics: a.INSTALL_SPEED_METRICS[t],
                    initialCase: a.INSTALL_SPEED_DEFAULT_CASE[t],
                    handleAddData: p,
                    renderChoicesTags: E,
                  }),
                  (0, i.jsxs)(s.default, {
                    bordered: !1,
                    style: { height: 464 },
                    children: [
                      (0, i.jsx)(n.default.Title, {
                        heading: 5,
                        style: { marginTop: 0 },
                        children: "Trending",
                      }),
                      (0, i.jsx)("div", { ref: r }),
                    ],
                  }),
                ],
              })
            );
          };
      },
      14528: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            Filters: function () {
              return p;
            },
            useFilterResult: function () {
              return E;
            },
          }),
          r("26003"),
          r("40199"),
          r("4870"),
          r("86866"),
          r("28612");
        var i = r("35250");
        r("17915"),
          r("55026"),
          r("18441"),
          r("39405"),
          r("60903"),
          r("2410"),
          r("2856");
        var n = r("75177"),
          s = r("28384"),
          l = r("61583"),
          a = r("17679"),
          d = r("94790"),
          o = r("60413"),
          c = r("76930"),
          u = r("43045"),
          m = r("70079");
        let f = (e) => {
            var t;
            let { productName: r, metrics: n, initialCase: c } = e;
            return (0, i.jsxs)(i.Fragment, {
              children: [
                (0, i.jsx)(s.default.Title, {
                  heading: 6,
                  style: { marginBottom: 24 },
                  children: "Add category by Cases and Metrics:",
                }),
                (0, i.jsxs)(o.default.Row, {
                  gutter: 40,
                  children: [
                    (0, i.jsx)(o.default.Col, {
                      span: 8,
                      children: (0, i.jsx)(d.default.Item, {
                        label: "Cases",
                        field: "caseName",
                        initialValue: c[0],
                        style: { marginBottom: 8 },
                        children: (0, i.jsx)(l.default, {
                          children:
                            null === (t = u.PRODUCT_CASES[r]) || void 0 === t
                              ? void 0
                              : t.map((e) =>
                                  (0, i.jsx)(
                                    l.default.Option,
                                    { value: e, children: e },
                                    e
                                  )
                                ),
                        }),
                      }),
                    }),
                    (0, i.jsx)(o.default.Col, {
                      span: 8,
                      children: (0, i.jsx)(d.default.Item, {
                        label: "Metrics",
                        field: "metricsName",
                        initialValue: n[0],
                        style: { marginBottom: 8 },
                        children: (0, i.jsx)(l.default, {
                          children: n.map((e) =>
                            (0, i.jsx)(
                              l.default.Option,
                              { value: e, children: e },
                              e
                            )
                          ),
                        }),
                      }),
                    }),
                    (0, i.jsx)(o.default.Col, {
                      span: 8,
                      children: (0, i.jsx)(a.default, {
                        type: "primary",
                        htmlType: "submit",
                        style: { width: 80 },
                        children: "Add",
                      }),
                    }),
                  ],
                }),
              ],
            });
          },
          p = (e) =>
            (0, i.jsxs)(c.default, {
              bordered: !1,
              style: { marginBottom: u.BASE_PADDING },
              children: [
                (0, i.jsx)(d.default, {
                  layout: "horizontal",
                  labelAlign: "left",
                  onSubmit: e.handleAddData,
                  children: (0, i.jsx)(f, { ...e }),
                }),
                e.renderChoicesTags(),
              ],
            }),
          E = (e, t) => {
            let [r, s] = (0, m.useState)([
                { case: e[0], metric: t },
                { case: e[1], metric: t },
              ]),
              l = (e) => {
                let t = [...r];
                t.splice(e, 1), s(t);
              };
            return {
              categories: r,
              handleAddData: (e) => {
                let t = { case: e.caseName, metric: e.metricsName };
                !r.some(
                  (t) => t.case === e.caseName && t.metric === e.metricsName
                ) && s([...r, t]);
              },
              renderChoicesTags: () =>
                (0, i.jsx)("div", {
                  style: {
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: u.BASE_PADDING,
                  },
                  children: r.map((e, t) =>
                    (0, i.jsx)(
                      "div",
                      {
                        style: { marginRight: 12, marginBottom: 12 },
                        children: (0, i.jsx)(
                          n.default,
                          {
                            closable: !0,
                            onClose: () => l(t),
                            children: `${e.case} + ${e.metric}`,
                          },
                          `${e.case}_${e.metric}`
                        ),
                      },
                      t
                    )
                  ),
                }),
            };
          };
      },
      29891: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            NavBar: function () {
              return f;
            },
          });
        var i = r("35250"),
          n = r("95325"),
          s = r("68511"),
          l = r("43045");
        let a = s.styled.div`
  position: fixed;
  display: flex;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  padding: 4px ${l.BASE_PADDING}px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
`,
          d = s.styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
  color: #111;
`,
          o = s.styled.img`
  height: 100%;
`,
          c = s.styled.div`
  width: 48px;
  height: 36px;
  overflow: hidden;
  margin-right: 16px;
`,
          u = s.styled.a`
  display: flex;
  align-items: center;
  font-size: 28px;
  color: #222;
`,
          m = () =>
            (0, i.jsx)(u, {
              target: "_blank",
              href: "https://github.com/web-infra-dev/web-infra-QoS",
              children: (0, i.jsx)(n.default, {}),
            }),
          f = () =>
            (0, i.jsxs)(a, {
              className: "nav-bar",
              children: [
                (0, i.jsxs)(d, {
                  children: [
                    (0, i.jsx)(c, {
                      children: (0, i.jsx)(o, {
                        src: "https://camo.githubusercontent.com/0e419e25ccf73fc3e186836cdec2f674f7a08b1eaf6ae1646464f9ea1593581c/68747470733a2f2f6c66332d7374617469632e62797465646e73646f632e636f6d2f6f626a2f6564656e2d636e2f7a712d75796c6b76542f6c6a68775a74686c61756b6a6c6b756c7a6c702f7765622d696e6672612d6c6f676f2e706e67",
                      }),
                    }),
                    "Web Infra QoS Dashboard",
                  ],
                }),
                (0, i.jsx)(m, {}),
              ],
            });
      },
      25997: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            SideMenu: function () {
              return x;
            },
          });
        var i = r("35250");
        r("55585");
        var n = r("48508"),
          s = r("69222"),
          l = r("81524"),
          a = r("41196"),
          d = r("42038"),
          o = r("67819"),
          c = r("120"),
          u = r("97752"),
          m = r("29282"),
          f = r("68511"),
          p = r("43045");
        let E = m.default.Item,
          S = m.default.SubMenu,
          D = {
            display: "flex",
            alignItems: "center",
            height: 38,
            fontSize: 13,
          },
          h = f.styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 260px;
  background: #fff;
  overflow: auto;
`,
          x = (e) =>
            (0, i.jsx)(h, {
              children: (0, i.jsxs)(m.default, {
                mode: "vertical",
                style: { padding: "16px 4px", fontSize: 15 },
                openKeys: e.openKeys,
                selectedKeys: e.selectedKeys,
                onClickMenuItem: e.onClickMenuItem,
                onClickSubMenu: e.onClickSubMenu,
                children: [
                  (0, i.jsxs)(
                    S,
                    {
                      title: (0, i.jsxs)(i.Fragment, {
                        children: [
                          (0, i.jsx)(u.default, {}),
                          " Modern.js Framework",
                        ],
                      }),
                      children: [
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(s.default, {}),
                              "Compile Speed",
                            ],
                          },
                          `${p.PRODUCT.MODERNJS_FRAMEWORK}_${p.MENU.COMPILE_SPEED}`
                        ),
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(n.default, {}),
                              "Install Speed",
                            ],
                          },
                          `${p.PRODUCT.MODERNJS_FRAMEWORK}_${p.MENU.INSTALL_SPEED}`
                        ),
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(l.default, {}),
                              "Bundle Size",
                            ],
                          },
                          `${p.PRODUCT.MODERNJS_FRAMEWORK}_${p.MENU.BUNDLE_SIZE}`
                        ),
                      ],
                    },
                    p.PRODUCT.MODERNJS_FRAMEWORK
                  ),
                  (0, i.jsxs)(
                    S,
                    {
                      title: (0, i.jsxs)(i.Fragment, {
                        children: [
                          (0, i.jsx)(c.default, {}),
                          " Modern.js Module",
                        ],
                      }),
                      children: [
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(s.default, {}),
                              "Compile Speed",
                            ],
                          },
                          `${p.PRODUCT.MODERNJS_MODULE}_${p.MENU.COMPILE_SPEED}`
                        ),
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(n.default, {}),
                              "Install Speed",
                            ],
                          },
                          `${p.PRODUCT.MODERNJS_MODULE}_${p.MENU.INSTALL_SPEED}`
                        ),
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(l.default, {}),
                              "Bundle Size",
                            ],
                          },
                          `${p.PRODUCT.MODERNJS_MODULE}_${p.MENU.BUNDLE_SIZE}`
                        ),
                      ],
                    },
                    p.PRODUCT.MODERNJS_MODULE
                  ),
                  (0, i.jsxs)(
                    S,
                    {
                      title: (0, i.jsxs)(i.Fragment, {
                        children: [(0, i.jsx)(d.default, {}), " Rspress"],
                      }),
                      children: [
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(s.default, {}),
                              "Compile Speed",
                            ],
                          },
                          `${p.PRODUCT.RSPRESS}_${p.MENU.COMPILE_SPEED}`
                        ),
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(n.default, {}),
                              "Install Speed",
                            ],
                          },
                          `${p.PRODUCT.RSPRESS}_${p.MENU.INSTALL_SPEED}`
                        ),
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(l.default, {}),
                              "Bundle Size",
                            ],
                          },
                          `${p.PRODUCT.RSPRESS}_${p.MENU.BUNDLE_SIZE}`
                        ),
                      ],
                    },
                    p.PRODUCT.RSPRESS
                  ),
                  (0, i.jsxs)(
                    S,
                    {
                      title: (0, i.jsxs)(i.Fragment, {
                        children: [(0, i.jsx)(o.default, {}), " Rsbuild"],
                      }),
                      children: [
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(s.default, {}),
                              "Compile Speed",
                            ],
                          },
                          `${p.PRODUCT.RSBUILD}_${p.MENU.COMPILE_SPEED}`
                        ),
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(n.default, {}),
                              "Install Speed",
                            ],
                          },
                          `${p.PRODUCT.RSBUILD}_${p.MENU.INSTALL_SPEED}`
                        ),
                        (0, i.jsxs)(
                          E,
                          {
                            style: D,
                            children: [
                              (0, i.jsx)(l.default, {}),
                              "Bundle Size",
                            ],
                          },
                          `${p.PRODUCT.RSBUILD}_${p.MENU.BUNDLE_SIZE}`
                        ),
                      ],
                    },
                    p.PRODUCT.RSBUILD
                  ),
                  (0, i.jsxs)(
                    E,
                    {
                      children: [
                        (0, i.jsx)(a.default, {}),
                        (0, i.jsx)("span", {
                          style: { marginLeft: "4px" },
                          children: "Rspack",
                        }),
                      ],
                    },
                    p.PRODUCT.RSPACK
                  ),
                ],
              }),
            });
      },
      1818: function (e, t, r) {
        "use strict";
        r.r(t);
        var i = r("35250"),
          n = r("82674");
        (0, r("99581").render)(
          (0, i.jsx)(n.default, {}),
          document.getElementById("root")
        );
      },
      43045: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            BASE_PADDING: function () {
              return i;
            },
            PRODUCT: function () {
              return n;
            },
            MENU: function () {
              return s;
            },
            PRODUCT_CASES: function () {
              return l;
            },
            BUNDLE_SIZE_DEFAULT_CASE: function () {
              return a;
            },
            BUNDLE_SIZE_METRICS: function () {
              return d;
            },
            COMPILE_SPEED_DEFAULT_CASE: function () {
              return o;
            },
            COMPILE_SPEED_METRICS: function () {
              return c;
            },
            INSTALL_SPEED_DEFAULT_CASE: function () {
              return u;
            },
            INSTALL_SPEED_METRICS: function () {
              return f;
            },
            PUBLIC_PATH: function () {
              return p;
            },
            LINE_CHART_DEFAULT_CONFIG: function () {
              return E;
            },
          });
        let i = 24,
          n = {
            MODERNJS_FRAMEWORK: "modernjs-framework",
            MODERNJS_MODULE: "modernjs-module",
            RSBUILD: "rsbuild",
            RSPRESS: "rspress",
            RSPACK: "rspack",
          },
          s = {
            BUNDLE_SIZE: "bundle-size",
            COMPILE_SPEED: "compile-speed",
            INSTALL_SPEED: "install-speed",
            CLI_SPEED: "cli-speed",
          },
          l = {
            [n.MODERNJS_FRAMEWORK]: [
              "app-minimal",
              "app-initial",
              "app-initial-rspack",
              "app-tailwind",
              "app-ssr",
              "app-ssg",
              "app-bff-koa",
              "app-arco-pro",
              "app-arco-pro-swc",
              "app-arco-pro-esbuild",
              "app-arco-pro-rspack",
            ],
            [n.MODERNJS_MODULE]: [
              "module-initial",
              "module-library",
              "module-library-sourcemap",
              "module-library-noautoexternal",
              "module-library-minify-esbuild",
              "module-library-minify-terser",
              "module-component",
            ],
            [n.RSPRESS]: [
              "rspress-minimal",
              "rspress-website",
              "rspress-website-mdxjs",
            ],
            [n.RSBUILD]: [
              "rsbuild-react",
              "rsbuild-arco-pro",
              "rsbuild-vue2",
              "rsbuild-vue3",
              "rsbuild-lit",
              "rsbuild-svelte",
              "rsbuild-vanilla",
            ],
          },
          a = {
            [n.MODERNJS_FRAMEWORK]: ["app-initial", "app-initial-rspack"],
            [n.MODERNJS_MODULE]: ["module-library", "module-component"],
            [n.RSPRESS]: ["rspress-website", "rspress-website-mdxjs"],
            [n.RSBUILD]: ["rsbuild-react", "rsbuild-arco-pro"],
          },
          d = {
            [n.MODERNJS_FRAMEWORK]: ["minifiedBundleSize", "gzippedBundleSize"],
            [n.MODERNJS_MODULE]: ["distSize", "gzippedDistSize"],
            [n.RSPRESS]: [
              "gzipInitialJsSize",
              "initialJsSize",
              "minifiedBundleSize",
              "gzippedBundleSize",
            ],
            [n.RSBUILD]: ["minifiedBundleSize", "gzippedBundleSize"],
          },
          o = {
            [n.MODERNJS_FRAMEWORK]: ["app-arco-pro", "app-arco-pro-rspack"],
            [n.MODERNJS_MODULE]: ["module-library", "module-component"],
            [n.RSPRESS]: ["rspress-website", "rspress-website-mdxjs"],
            [n.RSBUILD]: ["rsbuild-react", "rsbuild-arco-pro"],
          },
          c = {
            [n.MODERNJS_FRAMEWORK]: [
              "buildColdBootTime",
              "buildHotBootTime",
              "beforeBuildTime",
              "buildPluginSetupTime",
              "buildPrepareTime",
              "devColdBootTime",
              "devHotBootTime",
              "beforeDevTime",
              "devPluginSetupTime",
              "devPrepareTime",
            ],
            [n.MODERNJS_MODULE]: [
              "buildColdBootTime",
              "beforeBuildTime",
              "buildPluginSetupTime",
              "buildCjsTime",
              "buildEsmTime",
              "buildDtsTime",
            ],
            [n.RSPRESS]: [
              "buildColdBootTime",
              "devColdBootTime",
              "beforeBuildTime",
              "beforeDevTime",
              "routeGenerateTime",
            ],
            [n.RSBUILD]: [
              "buildColdBootTime",
              "devColdBootTime",
              "beforeBuildTime",
              "beforeDevTime",
            ],
          },
          u = {
            [n.MODERNJS_FRAMEWORK]: ["app-initial", "app-initial-rspack"],
            [n.MODERNJS_MODULE]: ["module-library", "module-component"],
            [n.RSPRESS]: ["rspress-website", "rspress-website-mdxjs"],
            [n.RSBUILD]: ["rsbuild-vanilla", "rsbuild-react"],
          },
          m = [
            "installSize",
            "dependenciesCount",
            "coldInstallTime",
            "hotInstallTime",
          ],
          f = {
            [n.MODERNJS_FRAMEWORK]: m,
            [n.MODERNJS_MODULE]: m,
            [n.RSPRESS]: m,
            [n.RSBUILD]: m,
          },
          p = "https://web-infra-dev.github.io/web-infra-QoS",
          E = {
            height: 400,
            seriesField: "category",
            xField: "x",
            yField: "y",
            xAxis: { label: { formatter: (e) => e.split(" ")[0] }, nice: !0 },
            yAxis: { nice: !0 },
            point: { size: 3 },
            stepType: "vh",
          };
      },
      83027: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            fetchMetrics: function () {
              return l;
            },
          }),
          r("26003"),
          r("40199");
        var i = r("43045"),
          n = r("75829");
        let s = async (e) => {
            let t = await n.getItem(e).catch(() => {});
            if (t) {
              let { data: e, timestamp: r } = t,
                i = new Date().getTime();
              if (i - r <= 432e5) return e;
            }
            let r = await fetch(e)
              .then((e) => e.json())
              .catch(() => {});
            if (r) {
              let t = { data: r, timestamp: new Date().getTime() };
              await n.setItem(e, t);
            }
            return r;
          },
          l = async (e, t) => {
            let r = await s(i.PUBLIC_PATH + `/data/${e}/${t}.json`);
            return Object.keys(r).map((e) => ({
              id: e,
              time: r[e].time,
              metrics: r[e],
            }));
          };
      },
      34031: function (e, t, r) {
        "use strict";
        r.r(t),
          r.d(t, {
            formatDateWithId: function () {
              return l;
            },
            formatFileSize: function () {
              return a;
            },
            formatSecond: function () {
              return d;
            },
            mergeData: function () {
              return o;
            },
          }),
          r("32272"),
          r("83476"),
          r("28612"),
          r("26003"),
          r("40199"),
          r("53041"),
          r("29933"),
          r("80024");
        var i = r("48891"),
          n = r.n(i);
        let s = (e) => n()(e).format("YY-MM-DD HH:mm"),
          l = (e) => `${s(e.time)}\u{FF08}${e.id}\u{FF09}`,
          a = function (e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "KB";
            return (
              "KB" === t ? (e /= 1024) : "MB" === t && (e = e / 1024 / 1024),
              Number(e.toFixed(2))
            );
          },
          d = (e) => Number((e / 1e3).toFixed(2)),
          o = (e, t, r) => {
            let i = [];
            return (
              e.forEach((e, n) => {
                let s = e.map((e) => ({
                  ...e,
                  caseName: t[n],
                  metricsName: r[n],
                }));
                i.push(...s);
              }),
              i
                .sort((e, t) => e.time - t.time)
                .filter((e) => e.metrics[e.metricsName])
            );
          };
      },
      19831: function (e, t, r) {},
    },
    s = {};
  function l(e) {
    var t = s[e];
    if (void 0 !== t) return t.exports;
    var r = (s[e] = { id: e, loaded: !1, exports: {} });
    return n[e](r, r.exports, l), (r.loaded = !0), r.exports;
  }
  (l.m = n),
    (l.es = function (e, t) {
      return (
        Object.keys(e).forEach(function (r) {
          "default" !== r &&
            !Object.prototype.hasOwnProperty.call(t, r) &&
            Object.defineProperty(t, r, {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            });
        }),
        e
      );
    }),
    (l.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (e = []),
    (l.O = function (t, r, i, n) {
      if (r) {
        n = n || 0;
        for (var s = e.length; s > 0 && e[s - 1][2] > n; s--) e[s] = e[s - 1];
        e[s] = [r, i, n];
        return;
      }
      for (var a = 1 / 0, s = 0; s < e.length; s++) {
        for (
          var r = e[s][0], i = e[s][1], n = e[s][2], d = !0, o = 0;
          o < r.length;
          o++
        )
          a >= n &&
          Object.keys(l.O).every(function (e) {
            return l.O[e](r[o]);
          })
            ? r.splice(o--, 1)
            : ((d = !1), n < a && (a = n));
        if (d) {
          e.splice(s--, 1);
          var c = i();
          void 0 !== c && (t = c);
        }
      }
      return t;
    }),
    (l.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (l.d = function (e, t) {
      for (var r in t)
        l.o(t, r) &&
          !l.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (l.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (l.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return l.d(t, { a: t }), t;
    }),
    (l.nmd = function (e) {
      return (e.paths = []), !e.children && (e.children = []), e;
    }),
    (t = { 980: 0 }),
    (l.O.j = function (e) {
      return 0 === t[e];
    }),
    (r = function (e, r) {
      var i = r[0],
        n = r[1],
        s = r[2],
        a,
        d,
        o = 0;
      if (
        i.some(function (e) {
          return 0 !== t[e];
        })
      ) {
        for (a in n) l.o(n, a) && (l.m[a] = n[a]);
        if (s) var c = s(l);
      }
      for (e && e(r); o < i.length; o++)
        (d = i[o]), l.o(t, d) && t[d] && t[d][0](), (t[d] = 0);
      return l.O(c);
    }),
    (i = self.webpackChunkwebsite = self.webpackChunkwebsite || []).forEach(
      r.bind(null, 0)
    ),
    (i.push = r.bind(null, i.push.bind(i)));
  var a = l.O(void 0, ["707", "126", "361", "118", "996"], function () {
    return l("1818");
  });
  l.O(a);
})();
