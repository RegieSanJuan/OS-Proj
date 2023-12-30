#include<stdio.h>

struct Process {
    int id;
    int arrivalTime;
    int burstTime;
    int priority;
    int completionTime;
    int turnaroundTime;
    int waitingTime;
};

void swap(struct Process* a, struct Process* b) {
    struct Process temp = *a;
    *a = *b;
    *b = temp;
}

void sortByPriority(struct Process processes[], int n) {
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-i-1; j++)
            if (processes[j].priority > processes[j+1].priority)
                swap(&processes[j], &processes[j+1]);
}

void calculateTimes(struct Process processes[], int n) {
    processes[0].completionTime = processes[0].burstTime;
    processes[0].turnaroundTime = processes[0].completionTime - processes[0].arrivalTime;
    processes[0].waitingTime = processes[0].turnaroundTime - processes[0].burstTime;

    for (int i = 1; i < n; i++) {
        processes[i].completionTime = processes[i-1].completionTime + processes[i].burstTime;
        processes[i].turnaroundTime = processes[i].completionTime - processes[i].arrivalTime;
        processes[i].waitingTime = processes[i].turnaroundTime - processes[i].burstTime;
    }
}

void displayGanttChart(struct Process processes[], int n) {
    printf("\nGantt Chart:\n");
    for (int i = 0; i < n; i++)
        printf("--------");
    printf("\n|");
    for (int i = 0; i < n; i++)
        printf(" P%-2d |", processes[i].id);
    printf("\n");
    for (int i = 0; i < n; i++)
        printf("--------");
    printf("\n");
}

int main() {
    int n;
    printf("Enter the number of processes (4-8): ");
    scanf("%d", &n);

    if (n < 4 || n > 8) {
        printf("Invalid number of processes. Please enter a number between 4 and 8.\n");
        return 1;
    }

    struct Process processes[n];

    printf("Enter arrival time, burst time, and priority for each process:\n");
    for (int i = 0; i < n; i++) {
        processes[i].id = i + 1;
        printf("Process P%d:\n", processes[i].id);
        printf("Arrival Time: ");
        scanf("%d", &processes[i].arrivalTime);
        printf("Burst Time: ");
        scanf("%d", &processes[i].burstTime);
        printf("Priority: ");
        scanf("%d", &processes[i].priority);
    }

    sortByPriority(processes, n);
    calculateTimes(processes, n);

    printf("\nProcess\tAT\tBT\tPriority\tCT\tTAT\tWT\n");
    for (int i = 0; i < n; i++) {
        printf("P%d\t%d\t%d\t%d\t\t%d\t%d\t%d\n", processes[i].id, processes[i].arrivalTime,
               processes[i].burstTime, processes[i].priority, processes[i].completionTime,
               processes[i].turnaroundTime, processes[i].waitingTime);
    }

    displayGanttChart(processes, n);

    float avgTAT = 0, avgWT = 0;
    for (int i = 0; i < n; i++) {
        avgTAT += processes[i].turnaroundTime;
        avgWT += processes[i].waitingTime;
    }

    avgTAT /= n;
    avgWT /= n;

    printf("\nAverage Turnaround Time: %.2f\n", avgTAT);
    printf("Average Waiting Time: %.2f\n", avgWT);

    return 0;
}
