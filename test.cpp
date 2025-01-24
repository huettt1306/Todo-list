#include <bits/stdc++.h>
using namespace std;

struct Task{
    string name;
    int index;
    bool isDone;
};

vector<Task> tasks;

void printMenu() {
    cout << "---- Menu ----\n";
    cout << "Write View to view list task\n";
    cout << "Write Add to add task\n";
    cout << "Write Del to delete task\n";
    cout << "Write Done \n";
}

void viewTasks() {
    cout << "List tasks:\n";
    for(Task task : tasks) {
        if(task.isDone) cout << "# ";
        cout << task.index << task.name << endl;
    }
}

void addTask() {
    Task task;
    getline(cin, task.name);
    if(tasks.empty()) task.index = 1;
    else task.index = tasks.back().index + 1;
    task.isDone = false;
    cout << "Added " << task.name;
    tasks.push_back(task);
}

void delTask(){
    int a;
    cin>>a;
    for(int i = 0; i < tasks.size(); i++) {
        if(tasks[i].index == a) {
            tasks.erase(tasks.begin() + i);
            cout<< "Deleted task #"<<a<<'\n';
            return;
        }
    }
    cout<<"None\n";
}
void doneTask(){
    int a;
    cin>>a;
    for(int i = 0; i < tasks.size(); i++) {
        if(tasks[i].index == a) {
            tasks[i].isDone = true;
            cout<< "Done task #"<<a<<'\n';
            return;
        }
    }
    cout<<"None\n";
}

void saveToFile() {
    ofstream file("log.txt");
    for(Task task : tasks) {
        file << task.index << " " << task.isDone << '\n';
        file << task.name << "\n";
    }
    file.close();
}

void readFromFile() {
    ifstream file("log.txt");
    int id;
    bool isDone;
    string name;
    while(file >> id) {
        file >> isDone;
        getline(file, name);
        getline(file, name);
        Task task;
        task.index = id; task.name = name; task.isDone = isDone;
        tasks.push_back(task);
    }
    file.close();
}


int main() {
    readFromFile();
    printMenu();

    string input;
    while(cin >> input) {
        if(input == "View") viewTasks();
        if(input == "Add") addTask();
        if(input == "Del") delTask();
        if(input == "Done") doneTask();
        saveToFile();
    }
}
