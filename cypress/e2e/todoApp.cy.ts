describe('todoApp', () => {

  beforeEach(() => {
    cy.visit('http://localhost:1234/');
  })

  it('should have a heading', () => {
    // Act
    cy.get("h2").contains("Välkommen till din todo-lista");
  })

  it('should type something in the input', () => {
    // Act
    cy.get("input#newTodoText").type("hejsan");
    // Assert
    cy.get("input#newTodoText")
      .should("have.value", "hejsan")
  })

  it('should add a todo', () => {
    // Act
    cy.get("input#newTodoText").type("hejsan");
    cy.get("button").contains("Skapa").click();
    cy.get("input#newTodoText")
      .should("have.value", "hejsan")

    // Assert
    cy.get("ul > li")
      .should("have.length", 1)
      .should("have.text", "hejsan")
  })

  it('should mark a todo as done', () => {
    // Act
    cy.get("input#newTodoText").type("hejsan");
    cy.get("button").contains("Skapa").click();
    cy.get("input#newTodoText")
      .should("have.value", "hejsan")

    cy.get("ul > li")
      .should("have.length", 1)
      .should("have.text", "hejsan")

    cy.get("li").contains("hejsan").click()

    // Assert
    cy.get("li").contains("hejsan")
      .should("have.class", "todo__text--done")
  })

  it('should mark a todo as NOT done', () => {
    // Act
    cy.get("input#newTodoText").type("hejsan");
    cy.get("button").contains("Skapa").click();
    cy.get("input#newTodoText")
      .should("have.value", "hejsan")

    cy.get("ul > li")
      .should("have.length", 1)
      .should("have.text", "hejsan")

    cy.get("li").contains("hejsan").click()
    
    cy.get("li").contains("hejsan")
      .should("have.class", "todo__text--done")
    cy.get("li").contains("hejsan").click()

    // Assert
    cy.get("li").contains("hejsan")
      .should("not.have.class", "todo__text--done")
  })

  it('should clear the todo list', () => {
    // Act
    cy.get("input#newTodoText").type("hejsan");
    cy.get("button").contains("Skapa").click();
    cy.get("input#newTodoText")
      .should("have.value", "hejsan")

    cy.get("ul > li")
      .should("have.length", 1)
      .should("have.text", "hejsan")

    cy.get("button#clearTodos").click()

    // Assert
    cy.get("ul").children("li")
      .should("have.length", 0)
  })
})