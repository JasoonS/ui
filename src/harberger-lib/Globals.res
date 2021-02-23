// A collection of functions to make code cleaner.
include Async

// React components
let reactMapWithDefault: (option<'a>, React.element, 'a => React.element) => React.element = (
  opt,
  default,
  f,
) =>
  switch opt {
  | None => default
  | Some(item) => f(item)
  }
let reactMap = (opt, f) => reactMapWithDefault(opt, React.null, f)

// For use with: https://github.com/reasonml-labs/bs-let
module Opt = {
  @dead("Opt.+let_") let let_ = Option.flatMap
}
