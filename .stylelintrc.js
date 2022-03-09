module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'order/properties-alphabetical-order': true,
    'no-empty-source': null,
    'rule-empty-line-before': null,
    'selector-list-comma-newline-after': null,
    'no-descending-specificity': null,
    'value-keyword-case': null, // 대소문자 혼용 가능
    'declaration-colon-newline-after': null, // 2줄 이상인 화살표 함수에서 에러 방지
  },
};
