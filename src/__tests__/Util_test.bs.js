// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Jest from "@glennsl/bs-jest/src/jest.js";
import * as Helper$WildCards from "../harberger-lib/Helper.bs.js";

Jest.describe("Expect", (function (param) {
        return Jest.testAll("isPositiveStringInteger", /* :: */[
                    /* tuple */[
                      "003",
                      true
                    ],
                    /* :: */[
                      /* tuple */[
                        "302",
                        true
                      ],
                      /* :: */[
                        /* tuple */[
                          "3546674266447602",
                          true
                        ],
                        /* :: */[
                          /* tuple */[
                            "1250000000000000000",
                            true
                          ],
                          /* :: */[
                            /* tuple */[
                              "302.2",
                              false
                            ],
                            /* :: */[
                              /* tuple */[
                                "-5",
                                false
                              ],
                              /* :: */[
                                /* tuple */[
                                  "",
                                  false
                                ],
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ], (function (param) {
                      return Jest.Expect.toBe(param[1], Jest.Expect.expect(Helper$WildCards.isPositiveStringInteger(param[0])));
                    }));
      }));

export {
  
}
/*  Not a pure module */