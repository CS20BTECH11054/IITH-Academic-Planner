export default class Course{
    constructor(name, code, credits, dept, slot, prerequisites, sem){
        this.name = name
        this.code = code
        this.credits = credits
        this.dept = dept
        this.slot = slot
        this.prerequisites = prerequisites
        this.sem = sem
        this.elec = ""
        this.msg = []
    }
    setMsg(str)
    {
      this.msg = this.msg.concat(str)
    }
  }