(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.zselect = factory());
})(this, function() {
  "use strict";
  const getSelectApi = (selectId) => {
    const setOpen = (bool) => {
      const select = document.getElementById(selectId);
      if (select) {
        const detail = {
          bool
        };
        const event = new CustomEvent("setOpen", { detail });
        select.dispatchEvent(event);
      }
    };
    const setOpenToggle = () => {
      const select = document.getElementById(selectId);
      if (select) {
        const event = new CustomEvent("setOpenToggle", {});
        select.dispatchEvent(event);
      }
    };
    const setSelectOption = (selected, optionIndex) => {
      const select = document.getElementById(selectId);
      if (select) {
        const detail = {
          optionIndex,
          selected
        };
        const event = new CustomEvent("setSelectOption", { detail });
        select.dispatchEvent(event);
      }
    };
    return {
      setOpen,
      setOpenToggle,
      setSelectOption
    };
  };
  const KEY = {
    RETURN: 13,
    ESC: 27
  };
  const uniq = () => {
    const str = "xxxxx4xxxyxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
    return str;
  };
  const setSelectId = (select) => {
    const selectId = select.id;
    if (!selectId) {
      const id = uniq();
      select.setAttribute("id", id);
      const removeSelectIdIfNeed = () => {
        select.removeAttribute("id");
      };
      return [
        id,
        removeSelectIdIfNeed
      ];
    }
    return [
      selectId,
      () => {
      }
    ];
  };
  const getMenuItemOption = (child) => {
    const {
      selected,
      disabled,
      text,
      value,
      index
    } = child;
    const selectOption = {
      type: "OPTION",
      selected,
      disabled,
      text,
      value,
      index
    };
    return selectOption;
  };
  const getOptgroupOptions = (optGroup) => {
    let optgroupOptions = [];
    for (const child of optGroup.children) {
      if ("OPTION" === child.tagName) {
        const option = getMenuItemOption(child);
        optgroupOptions = [
          ...optgroupOptions,
          option
        ];
      }
    }
    if (optgroupOptions.length > 0) {
      return optgroupOptions;
    }
    return void 0;
  };
  const getOptgroup = (child) => {
    const label = child.label;
    const optgroupOptions = getOptgroupOptions(child);
    const selectOptgroup = {
      type: "OPTGROUP",
      label,
      optgroupOptions
    };
    return selectOptgroup;
  };
  const getMenuList = (select) => {
    let list = [];
    for (const child of select.children) {
      if ("OPTGROUP" === child.tagName) {
        const optgroup = getOptgroup(child);
        list = [
          ...list,
          optgroup
        ];
      }
      if ("OPTION" === child.tagName) {
        const option = getMenuItemOption(child);
        list = [
          ...list,
          option
        ];
      }
    }
    return list;
  };
  const getSelectedOptions = (select) => {
    const list = [];
    for (const selectedOption of select.selectedOptions) {
      const {
        text,
        value,
        disabled,
        index
      } = selectedOption;
      list.push({
        text,
        value,
        disabled,
        index
      });
    }
    return list;
  };
  const setSelected = (select, optionIndex, selected) => {
    const option = select[optionIndex];
    if (option) {
      if (option.tagName === "OPTION") {
        option.selected = selected;
      }
    }
  };
  const getUpdate = (select) => {
    const tmp = {
      value: null
    };
    const update = (html) => {
      var _a;
      const template = document.createElement("template");
      template.innerHTML = html.trim();
      const rootElement = template.content.children[0];
      rootElement.addEventListener("mousedown", (event) => {
        event.preventDefault();
        event.stopPropagation();
      }, false);
      if (tmp.value) {
        (_a = tmp.value.parentElement) == null ? void 0 : _a.removeChild(tmp.value);
      }
      tmp.value = rootElement;
      select.before(rootElement);
    };
    const removeUpdate = () => {
      var _a;
      if (tmp.value) {
        (_a = tmp.value.parentElement) == null ? void 0 : _a.removeChild(tmp.value);
        tmp.value = null;
      }
    };
    return [
      update,
      removeUpdate
    ];
  };
  const getSelect = (select, render) => {
    const [selectId, removeSelectIdIfNeed] = setSelectId(select);
    const [update, removeUpdate] = getUpdate(select);
    let stateOpen = false;
    const listReplace = [
      ["$open()", `zSelect('${selectId}').setOpen(true)`],
      ["$close()", `zSelect('${selectId}').setOpen(false)`],
      ["$toggle()", `zSelect('${selectId}').setOpenToggle()`],
      ["$select(", `zSelect('${selectId}').setSelectOption(true,`],
      ["$unselect(", `zSelect('${selectId}').setSelectOption(false,`]
    ];
    const updateBlock = () => {
      const menuList = getMenuList(select);
      const selectedOptions = getSelectedOptions(select);
      const focus = document.activeElement === select;
      let html = render({
        selectId,
        focus,
        open: stateOpen,
        menuList,
        selectedOptions
      });
      for (const [key, value] of listReplace) {
        html = html.replaceAll(key, value);
      }
      update(html);
    };
    const runUpdate = (() => {
      let updatedTimeoutId = void 0;
      return () => {
        if (updatedTimeoutId) {
          window.clearTimeout(updatedTimeoutId);
        }
        updatedTimeoutId = window.setTimeout(() => {
          updateBlock();
        }, 10);
      };
    })();
    const onSetOpen = (event) => {
      stateOpen = event.detail.bool;
      select.focus();
      runUpdate();
    };
    select.addEventListener("setOpen", onSetOpen);
    const onSetOpenToggle = () => {
      stateOpen = !stateOpen;
      select.focus();
      runUpdate();
    };
    select.addEventListener("setOpenToggle", onSetOpenToggle);
    const setSelectOption = (event) => {
      const optionIndex = event.detail.optionIndex;
      const selected = event.detail.selected;
      setSelected(select, optionIndex, selected);
      select.dispatchEvent(new Event("change", { bubbles: true }));
      runUpdate();
    };
    select.addEventListener("setSelectOption", setSelectOption);
    const onChange = () => {
      runUpdate();
    };
    select.addEventListener("change", onChange);
    const onFocus = () => {
      runUpdate();
    };
    select.addEventListener("focus", onFocus);
    const onBlur = () => {
      stateOpen = false;
      runUpdate();
    };
    select.addEventListener("blur", onBlur);
    const onKeydown = (event) => {
      if (event.keyCode === KEY.RETURN) {
        stateOpen = !stateOpen;
        runUpdate();
      }
    };
    select.addEventListener("keydown", onKeydown);
    runUpdate();
    const destroy = () => {
      select.removeEventListener("setOpen", onSetOpen);
      select.removeEventListener("setOpenToggle", onSetOpenToggle);
      select.removeEventListener("setSelectOption", setSelectOption);
      select.removeEventListener("change", onChange);
      select.removeEventListener("focus", onFocus);
      select.removeEventListener("blur", onBlur);
      select.removeEventListener("keydown", onKeydown);
      removeSelectIdIfNeed();
      removeUpdate();
    };
    return destroy;
  };
  const zSelect = (select, render) => {
    if (typeof select === "string") {
      return getSelectApi(select);
    }
    if (select instanceof HTMLSelectElement) {
      return getSelect(select, render);
    }
    throw new Error("Что то пошло не так.");
  };
  window["zSelect"] = zSelect;
  return zSelect;
});
