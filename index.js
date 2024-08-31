// Define a class for Fog Nodes
class FogNode {
    constructor(nodeId) {
        this.nodeId = nodeId;
        this.tasks = [];
    }

    allocateTask(task) {
        this.tasks.push(task);
        console.log(`Task ${task.taskId} allocated to Fog Node ${this.nodeId}`);
    }
}

// Define a class for Tasks
class Task {
    constructor(taskId) {
        this.taskId = taskId;
    }
}

// Define the main FogComputingSDK class
class FogComputingSDK {
    constructor(numTasks, numFogNodes) {
        this.numTasks = numTasks;
        this.numFogNodes = numFogNodes;
        this.fogNodes = [];
        this.tasks = [];
        this.initializeFogNodes();
        this.initializeTasks();
        this.allocateTasks();
    }

    initializeFogNodes() {
        for (let i = 0; i < this.numFogNodes; i++) {
            this.fogNodes.push(new FogNode(i));
        }
    }

    initializeTasks() {
        for (let i = 0; i < this.numTasks; i++) {
            this.tasks.push(new Task(i));
        }
    }

    allocateTasks() {
        // Simple Round Robin Allocation
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            const fogNode = this.fogNodes[i % this.numFogNodes];
            fogNode.allocateTask(task);
        }
    }

    getAllocation() {
        // For testing or debugging purposes
        const allocation = {};
        this.fogNodes.forEach(node => {
            allocation[node.nodeId] = node.tasks.map(task => task.taskId);
        });
        return allocation;
    }
}

// Export the FogComputingSDK class as a module
module.exports = FogComputingSDK;
