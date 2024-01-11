/* eslint-env node */

import ts from "typescript";
import { join } from "path";

// Constants
const filePath = join(process.cwd(), "src", "components", "Button.tsx");

function extractButtonProps(type, typeChecker) {
  if (type.isIntersection()) {
    const properties = {};
    type.types.forEach((t) => {
      if (t.symbol) {
        const typeProperties = typeChecker.getPropertiesOfType(t);
        typeProperties.forEach((prop) => {
          const propName = prop.name;
          const propType = typeChecker.getTypeOfSymbolAtLocation(
            prop,
            prop.valueDeclaration,
          );
          properties[propName] = extractType(propType, typeChecker);
        });
      }
    });
    return properties;
  } else {
    return "unknown";
  }
}

function extractType(type, typeChecker) {
  if (type.isLiteral()) {
    return type.value;
  } else if (type.isUnion()) {
    return type.types.map((t) => extractType(t, typeChecker));
  } else if (type.isIntersection()) {
    return extractButtonProps(type, typeChecker);
  } else if (type.symbol) {
    if (
      type.symbol.valueDeclaration &&
      ts.isTypeParameterDeclaration(type.symbol.valueDeclaration)
    ) {
      return type.symbol.valueDeclaration.constraint
        ? extractType(type.symbol.valueDeclaration.constraint, typeChecker)
        : "Generic";
    }

    if (type.symbol.name === "ButtonProps") {
      return extractButtonProps(type, typeChecker);
    }

    return type.symbol.name || "unknown";
  } else {
    return "unknown";
  }
}

function parseTypeAliasDeclaration(node, typeChecker) {
  const typeName = node.name.text;
  const type = typeChecker.getTypeFromTypeNode(node.type);
  return { [typeName]: extractType(type, typeChecker) };
}

function parseFile(filePath) {
  const program = ts.createProgram([filePath], {});
  const typeChecker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
    throw new Error("File not found");
  }

  const types = {};

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isTypeAliasDeclaration(node)) {
      Object.assign(types, parseTypeAliasDeclaration(node, typeChecker));
    }
  });

  return types;
}

// Example usage:
try {
  const result = parseFile(filePath);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error("Error parsing file:", error.message);
}
